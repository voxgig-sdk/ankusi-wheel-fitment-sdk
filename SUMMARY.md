# ANKUSI Wheel Fitment API

Free wheel fitment data (bolt pattern, center bore, factory wheel size and offset, reference flush and maximum aftermarket sizes) for about 10,000 vehicles, served by a WordPress REST namespace on ankusiwheels.com. No key, CORS enabled, data licensed CC BY 4.0 (credit &quot;ANKUSI Wheel Fitment Dataset&quot;). Endpoints from the documentation page https://ankusiwheels.com/wheel-fitment-api/ and the WordPress namespace index (GET /wp-json/ankusi/v1); every schema was taken from live GET probes on 2026-10-23 (dataset version 2026.10.19, 10093 records). The docs ask for no more than one request per second; responses are cached for an hour. Divergences from the docs: `lug_count` is a string in most records but an integer in some newer ones (403 of 10093 in the full dataset, for example AITO M8), and the limit parameter is silently capped at 100. Site-internal routes in the namespace (embed-ping, blog-*, pins, inquiry, ev, inline-swap) are not part of the public API and are not modelled. Unverified: whether make matching tolerates whitespace or aliases, and the exact semantics of year when combined with `bolt_pattern` only.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 2 entities and 4 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Dataset

Results: Successful response; CSV text.

SDK operations: `list`, `load`.

Key fields to recognise:

- `changelog`: Dataset releases, newest first.

### Fitment

Results: Matching vehicles (an empty results array when nothing matches).; Successful response.

SDK operations: `list`.

Key fields to recognise:

- `bolt_pattern`: Lug count x pitch circle diameter in mm.
- `center_bore_mm`: Hub bore diameter in mm.
- `center_bore_rear_mm`: Rear hub bore in mm when it differs from the front; otherwise empty.
- `chassis_code`: Chassis code or a year span; often empty.
- `flush_wheel`: Reference size and offset for a flush fit on stock suspension.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Dataset | `list` | `GET /dataset/json` | See reference |
| Dataset | `load` | `GET /dataset/csv` | See reference |
| Fitment | `list` | `GET /fitment` | See reference |
| Fitment | `list` | `GET /makes` | See reference |

## Connect to the API

- ANKUSI WordPress REST namespace: `https://ankusiwheels.com/wp-json/ankusi/v1`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `ankusi-wheel-fitment_list`: List records for an entity. Supported entities: `dataset`, `fitment`.
- `ankusi-wheel-fitment_load`: Load one record for an entity. Supported entities: `dataset`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

