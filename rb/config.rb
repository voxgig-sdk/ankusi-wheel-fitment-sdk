# AnkusiWheelFitment SDK configuration

module AnkusiWheelFitmentConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "AnkusiWheelFitment",
        "slug" => "ankusi-wheel-fitment",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://ankusiwheels.com/wp-json/ankusi/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "dataset" => {},
          "fitment" => {},
        },
      },
      "entity" => {
        "dataset" => {
          "fields" => [
            {
              "name" => "changelog",
              "title" => "Changelog",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "Dataset releases, newest first.",
            },
            {
              "name" => "columns",
              "title" => "Columns",
              "type" => "`$ARRAY`",
              "req" => true,
            },
            {
              "name" => "data",
              "title" => "Data",
              "type" => "`$ARRAY`",
              "req" => true,
            },
            {
              "name" => "license",
              "title" => "License",
              "type" => "`$STRING`",
              "req" => true,
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "req" => true,
            },
            {
              "name" => "records",
              "title" => "Records",
              "type" => "`$INTEGER`",
              "req" => true,
            },
            {
              "name" => "source",
              "title" => "Source",
              "type" => "`$STRING`",
              "req" => true,
            },
            {
              "name" => "version",
              "title" => "Version",
              "type" => "`$STRING`",
              "req" => true,
            },
          ],
          "name" => "dataset",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/dataset/json",
                  "segments" => [
                    {
                      "lit" => "dataset",
                    },
                    {
                      "lit" => "json",
                    },
                  ],
                  "parts" => [
                    "dataset",
                    "json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {
                    "$action" => "json",
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/dataset/csv",
                  "segments" => [
                    {
                      "lit" => "dataset",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "parts" => [
                    "dataset",
                    "csv",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {
                    "$action" => "csv",
                  },
                  "response" => {
                    "kind" => "raw",
                    "media" => "text/csv",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "fitment" => {
          "fields" => [
            {
              "name" => "bolt_pattern",
              "title" => "Bolt Pattern",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Lug count x pitch circle diameter in mm.",
            },
            {
              "name" => "center_bore_mm",
              "title" => "Center Bore Mm",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Hub bore diameter in mm.",
            },
            {
              "name" => "center_bore_rear_mm",
              "title" => "Center Bore Rear Mm",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Rear hub bore in mm when it differs from the front; otherwise empty.",
            },
            {
              "name" => "chassis_code",
              "title" => "Chassis Code",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Chassis code or a year span; often empty.",
            },
            {
              "name" => "flush_wheel",
              "title" => "Flush Wheel",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Reference size and offset for a flush fit on stock suspension.",
            },
            {
              "name" => "lug_count",
              "title" => "Lug Count",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Number of lugs.",
            },
            {
              "name" => "make",
              "title" => "Make",
              "type" => "`$STRING`",
              "req" => true,
            },
            {
              "name" => "max_wheel",
              "title" => "Max Wheel",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Largest commonly fitted size before rubbing.",
            },
            {
              "name" => "model",
              "title" => "Model",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Full model name, including the make.",
            },
            {
              "name" => "oe_wheel",
              "title" => "Oe Wheel",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Factory wheel size and offset as published by the manufacturer.",
            },
            {
              "name" => "source_lang",
              "title" => "Source Lang",
              "type" => "`$STRING`",
              "short" => "Language of the source guide (en, ru, th, es, fr, ar).",
            },
            {
              "name" => "source_url",
              "title" => "Source Url",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The full fitment guide for this vehicle on ankusiwheels.com.",
            },
            {
              "name" => "vehicles",
              "title" => "Vehicles",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Number of vehicles of this make in the dataset.",
            },
            {
              "name" => "year",
              "title" => "Year",
              "type" => "`$STRING`",
              "req" => true,
            },
          ],
          "name" => "fitment",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/fitment",
                  "segments" => [
                    {
                      "lit" => "fitment",
                    },
                  ],
                  "parts" => [
                    "fitment",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "bolt_pattern",
                        "orig" => "bolt_pattern",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "6x139.7",
                        "field" => true,
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "make",
                        "orig" => "make",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "Toyota",
                        "field" => true,
                      },
                      {
                        "name" => "model",
                        "orig" => "model",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "Camry",
                        "field" => true,
                      },
                      {
                        "name" => "year",
                        "orig" => "year",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 2019,
                        "field" => true,
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/makes",
                  "segments" => [
                    {
                      "lit" => "makes",
                    },
                  ],
                  "parts" => [
                    "makes",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {},
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    AnkusiWheelFitmentFeatures.make_feature(name)
  end
end
