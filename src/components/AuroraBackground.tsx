import { useEffect, useRef, useState } from 'react'

const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }`

// Volumetric aurora: the view ray is marched through a stack of noise-displaced planes at increasing
// distance, so every pixel accumulates luminous curtains at different depths (true parallax, no flat blobs).
// Technique adapted from the well-known tri-noise aurora raymarcher; palette, motion and controls are mine.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uInt;
uniform float uShift;
uniform float uSteps;

mat2 mm2(float a){ float c=cos(a), s=sin(a); return mat2(c,s,-s,c); }
const mat2 m2 = mat2(0.95534, 0.29552, -0.29552, 0.95534);
float tri(float x){ return clamp(abs(fract(x)-.5), 0.01, 0.49); }
vec2 tri2(vec2 p){ return vec2(tri(p.x)+tri(p.y), tri(p.y+tri(p.x))); }
float hash21(vec2 n){ return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }

float triNoise2d(vec2 p, float spd){
  float z = 1.8; float z2 = 2.5; float rz = 0.;
  p *= mm2(p.x * 0.06);
  vec2 bp = p;
  for (int i = 0; i < 5; i++){
    vec2 dg = tri2(bp * 1.85) * .75;
    dg *= mm2(uTime * spd);
    p -= dg / z2;
    bp *= 1.3; z2 *= .45; z *= .42;
    p *= 1.21 + (rz - 1.0) * .02;
    rz += tri(p.x + tri(p.y)) * z;
    p *= -m2;
  }
  return clamp(1. / pow(rz * 29., 1.3), 0., .55);
}

vec4 aurora(vec3 ro, vec3 rd){
  vec4 col = vec4(0.);
  vec4 avg = vec4(0.);
  float scale = 50. / uSteps;
  for (int k = 0; k < 44; k++){
    if (float(k) >= uSteps) break;
    float i = float(k) * scale;
    float of = 0.006 * hash21(gl_FragCoord.xy) * smoothstep(0., 15., i);
    float pt = ((.8 + pow(i, 1.4) * .002) - ro.y) / (rd.y * 2. + 0.4);
    pt -= of;
    vec3 bpos = ro + pt * rd;
    vec2 p = bpos.zx * 1.7;
    float rzt = triNoise2d(p, 0.06);
    // a family of blues: navy, royal, cobalt, sky, ice; teal-blue and indigo only as rare accents
    vec3 navy = vec3(0.04, 0.10, 0.42);
    vec3 royal = vec3(0.145, 0.388, 0.922);
    vec3 cobalt = vec3(0.0, 0.27, 0.85);
    vec3 sky = vec3(0.376, 0.647, 0.98);
    float s1 = sin(i * 0.09 + uTime * 0.05) * .5 + .5;
    float s2 = sin(p.x * .35 + i * .03 - uTime * .03) * .5 + .5;
    float s3 = sin(p.y * .25 + uTime * .04 + i * .02) * .5 + .5;
    vec3 c = mix(mix(navy, royal, s1), mix(cobalt, sky, s2), s3);
    c = mix(c, vec3(0.10, 0.62, 0.90), smoothstep(.72, 1., s2 * s3 * 1.6) * .45);   // teal-blue
    c = mix(c, vec3(0.36, 0.34, 0.92), smoothstep(.8, 1., sin(i * 0.07 - p.y * .2) * .5 + .5) * .3); // indigo
    c += vec3(0.62, 0.82, 1.0) * pow(rzt * 1.8, 3.0) * 0.5; // ice-blue cores
    vec4 col2 = vec4(c * rzt, rzt);
    avg = mix(avg, col2, .5);
    col += avg * exp2(-i * 0.065 - 2.5) * smoothstep(0., 5., i);
  }
  col *= smoothstep(-0.14, 0.10, rd.y) * clamp(rd.y * 9. + .55, 0., 1.);
  return col * scale * 1.75; // scale normalises brightness across quality levels
}

void main(){
  vec2 p = gl_FragCoord.xy / uRes.xy - 0.5;
  p.x *= uRes.x / uRes.y;
  vec3 ro = vec3(0., 0., -6.7);
  vec3 rd = normalize(vec3(p * 1.15, 1.3));
  rd.yz *= mm2(0.24 + uMouse.y * 0.06);
  rd.xz *= mm2(uShift + uMouse.x * 0.10);

  // night sky: #050816 up to #080D1C with a faint blue haze near the horizon
  vec3 col = mix(vec3(0.012, 0.020, 0.062), vec3(0.024, 0.040, 0.096), smoothstep(-.4, .9, p.y + .5));
  col += vec3(0.012, 0.03, 0.08) * smoothstep(.5, -.5, p.y);

  vec4 aur = aurora(ro, rd);
  // slow brighter wave travelling along the curtains
  float wave = 1. + .38 * smoothstep(.55, 1., sin(rd.x * 3.2 - uTime * .22) * .5 + .5);
  col = col * (1. - aur.a) + aur.rgb * wave * uInt;

  col += (hash21(gl_FragCoord.xy + fract(uTime)) - .5) / 255.;
  gl_FragColor = vec4(col, 1.);
}
`

/** Full-screen WebGL aurora. Renders at reduced resolution and animates outside React state. */
export default function AuroraBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = ref.current!
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' })
    if (!gl) {
      console.warn('WebGL unavailable, using CSS fallback')
      setFailed(true)
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 768px)').matches

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error((type === gl.VERTEX_SHADER ? 'vertex: ' : 'fragment: ') + (gl.getShaderInfoLog(s) || 'no log') + ' ctxLost=' + gl.isContextLost())
      return s
    }
    let prog: WebGLProgram
    try {
      prog = gl.createProgram()!
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link')
    } catch (err) {
      console.warn('Aurora shader unavailable, using CSS fallback:', err)
      setFailed(true)
      return
    }
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const U = (n: string) => gl.getUniformLocation(prog, n)
    const uRes = U('uRes'), uTime = U('uTime'), uMouse = U('uMouse'), uInt = U('uInt'), uShift = U('uShift'), uSteps = U('uSteps')

    // resolution scale: soft aurora survives heavy downsampling; adapt it if frames run long
    // ?q=low forces a cheap configuration (useful on software renderers and for debugging)
    const low = new URLSearchParams(window.location.search).get('q') === 'low'
    let scale = low ? 0.22 : mobile ? 0.34 : 0.5
    const steps = low ? 14 : mobile ? 22 : 38
    const resize = () => {
      canvas.width = Math.max(2, Math.round(window.innerWidth * scale))
      canvas.height = Math.max(2, Math.round(window.innerHeight * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()

    let tx = 0, ty = 0, mx = 0, my = 0
    let inten = 1, scroll = window.scrollY
    let raf = 0
    let visible = true
    const t0 = performance.now()
    let last = t0
    let slow = 0

    const render = (now: number) => {
      const t = reduce ? 14 : (now - t0) / 1000
      mx += (tx - mx) * 0.03
      my += (ty - my) * 0.03
      // bright over the hero, calmer behind content; slow breathing on top
      const vh = window.innerHeight
      const target = (0.42 + 0.58 * Math.max(0, 1 - scroll / (vh * 0.9))) * (0.94 + 0.06 * Math.sin(t * 0.17))
      inten += (target - inten) * 0.06
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t * 0.8)
      gl.uniform2f(uMouse, mx, my)
      gl.uniform1f(uInt, inten)
      gl.uniform1f(uShift, scroll * 0.00045)
      gl.uniform1f(uSteps, steps)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      const dt = now - last
      if (mobile && dt < 30) return // ~30fps on phones
      last = now
      // if frames take too long for a while, lower the render resolution
      if (dt > 40) slow++
      else slow = Math.max(0, slow - 1)
      if (slow > 40 && scale > 0.25) {
        scale *= 0.8
        slow = 0
        resize()
      }
      render(now)
    }

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5
      ty = e.clientY / window.innerHeight - 0.5
    }
    const onScroll = () => {
      scroll = window.scrollY
      if (reduce) render(performance.now())
    }
    const onVis = () => {
      visible = !document.hidden
    }
    const onResize = () => {
      resize()
      if (reduce) render(performance.now())
    }
    const onLost = (e: Event) => {
      console.warn('WebGL context lost, using CSS fallback')
      e.preventDefault()
      cancelAnimationFrame(raf)
      setFailed(true)
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    canvas.addEventListener('webglcontextlost', onLost)
    if (reduce) render(performance.now())
    else {
      window.addEventListener('pointermove', onMove, { passive: true })
      raf = requestAnimationFrame(loop)
    }
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
      canvas.removeEventListener('webglcontextlost', onLost)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
    }
  }, [])

  if (failed) {
    // CSS fallback when WebGL is unavailable: layered, slowly drifting blue light
    return (
      <div className="absolute inset-0">
        <div className="neb absolute -left-[10%] top-[-10%] h-[70vh] w-[90vw] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,.35), transparent 65%)', filter: 'blur(40px)', ['--dx' as string]: '8%', ['--dy' as string]: '6%', ['--t' as string]: '22s' }} />
        <div className="neb absolute right-[-15%] top-[5%] h-[60vh] w-[80vw] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(66,232,213,.16), transparent 65%)', filter: 'blur(50px)', ['--dx' as string]: '-8%', ['--dy' as string]: '5%', ['--t' as string]: '28s' }} />
        <div className="neb absolute left-[20%] top-[15%] h-[50vh] w-[70vw] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(96,165,250,.20), transparent 65%)', filter: 'blur(45px)', ['--dx' as string]: '6%', ['--dy' as string]: '-5%', ['--t' as string]: '34s' }} />
      </div>
    )
  }
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
