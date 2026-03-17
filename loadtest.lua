-- Load test script for failover app
-- Simulates real traffic with different fireplace domains

local domains = {
  "fireplace-built.top",
  "fireplace-bestpro.top",
  "fireplace-nearme.com",
  "fireplace-fix.com",
  "fireplace-prime.com",
  "fireplace-now.com",
  "fireplace-firmx.top",
  "fireplace-rapidx.top",
  "fireplace-supreme.com",
  "fireplace-pro.com"
}

local paths = {
  "/",
  "/fireplace-repair",
  "/fireplace-cleaning",
  "/fireplace-maintenance",
  "/gas-fireplace-services",
  "/wood-burning-fireplace"
}

local counter = 0

request = function()
  counter = counter + 1
  local domain = domains[(counter % #domains) + 1]
  local path = paths[(counter % #paths) + 1]

  wrk.headers["Host"] = domain
  return wrk.format("GET", path)
end

done = function(summary, latency, requests)
  io.write("\n========== LOAD TEST RESULTS ==========\n")
  io.write(string.format("  Duration:        %ds\n", summary.duration / 1000000))
  io.write(string.format("  Requests:        %d\n", summary.requests))
  io.write(string.format("  Errors:          %d (connect: %d, read: %d, write: %d, timeout: %d)\n",
    summary.errors.connect + summary.errors.read + summary.errors.write + summary.errors.timeout,
    summary.errors.connect, summary.errors.read, summary.errors.write, summary.errors.timeout))
  io.write(string.format("  Req/sec:         %.2f\n", summary.requests / (summary.duration / 1000000)))
  io.write(string.format("  Bytes/sec:       %.2f MB\n", (summary.bytes / (summary.duration / 1000000)) / 1048576))
  io.write(string.format("  Non-2xx/3xx:     %d\n", summary.errors.status))
  io.write("\n  Latency Distribution:\n")
  for _, p in pairs({50, 75, 90, 99}) do
    io.write(string.format("    %d%%:    %.2fms\n", p, latency:percentile(p) / 1000))
  end
  io.write("========================================\n")
end
