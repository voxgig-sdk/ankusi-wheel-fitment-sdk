# AnkusiWheelFitment SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "AnkusiWheelFitment",
            "slug": "ankusi-wheel-fitment",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://ankusiwheels.com/wp-json/ankusi/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "dataset": {},
                "fitment": {},
            },
        },
        "entity": {
      "dataset": {
        "fields": [
          {
            "name": "changelog",
            "title": "Changelog",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Dataset releases, newest first.",
          },
          {
            "name": "columns",
            "title": "Columns",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "data",
            "title": "Data",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "license",
            "title": "License",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "records",
            "title": "Records",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "dataset",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/dataset/json",
                "segments": [
                  {
                    "lit": "dataset",
                  },
                  {
                    "lit": "json",
                  },
                ],
                "parts": [
                  "dataset",
                  "json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "json",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/dataset/csv",
                "segments": [
                  {
                    "lit": "dataset",
                  },
                  {
                    "lit": "csv",
                  },
                ],
                "parts": [
                  "dataset",
                  "csv",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "csv",
                },
                "response": {
                  "kind": "raw",
                  "media": "text/csv",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "fitment": {
        "fields": [
          {
            "name": "bolt_pattern",
            "title": "Bolt Pattern",
            "type": "`$STRING`",
            "req": True,
            "short": "Lug count x pitch circle diameter in mm.",
          },
          {
            "name": "center_bore_mm",
            "title": "Center Bore Mm",
            "type": "`$STRING`",
            "req": True,
            "short": "Hub bore diameter in mm.",
          },
          {
            "name": "center_bore_rear_mm",
            "title": "Center Bore Rear Mm",
            "type": "`$STRING`",
            "req": True,
            "short": "Rear hub bore in mm when it differs from the front; otherwise empty.",
          },
          {
            "name": "chassis_code",
            "title": "Chassis Code",
            "type": "`$STRING`",
            "req": True,
            "short": "Chassis code or a year span; often empty.",
          },
          {
            "name": "flush_wheel",
            "title": "Flush Wheel",
            "type": "`$STRING`",
            "req": True,
            "short": "Reference size and offset for a flush fit on stock suspension.",
          },
          {
            "name": "lug_count",
            "title": "Lug Count",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Number of lugs.",
          },
          {
            "name": "make",
            "title": "Make",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "max_wheel",
            "title": "Max Wheel",
            "type": "`$STRING`",
            "req": True,
            "short": "Largest commonly fitted size before rubbing.",
          },
          {
            "name": "model",
            "title": "Model",
            "type": "`$STRING`",
            "req": True,
            "short": "Full model name, including the make.",
          },
          {
            "name": "oe_wheel",
            "title": "Oe Wheel",
            "type": "`$STRING`",
            "req": True,
            "short": "Factory wheel size and offset as published by the manufacturer.",
          },
          {
            "name": "source_lang",
            "title": "Source Lang",
            "type": "`$STRING`",
            "short": "Language of the source guide (en, ru, th, es, fr, ar).",
          },
          {
            "name": "source_url",
            "title": "Source Url",
            "type": "`$STRING`",
            "req": True,
            "short": "The full fitment guide for this vehicle on ankusiwheels.com.",
          },
          {
            "name": "vehicles",
            "title": "Vehicles",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Number of vehicles of this make in the dataset.",
          },
          {
            "name": "year",
            "title": "Year",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "fitment",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/fitment",
                "segments": [
                  {
                    "lit": "fitment",
                  },
                ],
                "parts": [
                  "fitment",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "args": {
                  "query": [
                    {
                      "name": "bolt_pattern",
                      "orig": "bolt_pattern",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "6x139.7",
                      "field": True,
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "make",
                      "orig": "make",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "Toyota",
                      "field": True,
                    },
                    {
                      "name": "model",
                      "orig": "model",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "Camry",
                      "field": True,
                    },
                    {
                      "name": "year",
                      "orig": "year",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 2019,
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/makes",
                "segments": [
                  {
                    "lit": "makes",
                  },
                ],
                "parts": [
                  "makes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
