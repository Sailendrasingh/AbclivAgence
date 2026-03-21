import { performance } from "node:perf_hooks"

export function startTimer(): number {
  return performance.now()
}

export function elapsedMs(start: number): number {
  return Math.round((performance.now() - start) * 100) / 100
}

export function withTimingHeader(response: Response, start: number): Response {
  response.headers.set("x-response-time-ms", String(elapsedMs(start)))
  return response
}
