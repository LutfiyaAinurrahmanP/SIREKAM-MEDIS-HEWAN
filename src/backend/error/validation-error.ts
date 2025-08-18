import { ZodError } from "zod";

export function formatZodError(err: ZodError) {
  const errors: Record<string, Record<string, string>> = {};

  err.issues.forEach((issue) => {
    const field = issue.path[0] as string;

    if (!errors[field]) {
      errors[field] = {};
    }

    let errorType: string;

    switch (issue.code) {
      case "too_small":
        if ((issue as any).minimum === 1) {
          errorType = "required";
        } else {
          errorType = "min";
        }
        break;

      case "too_big":
        errorType = "max";
        break;

      case "invalid_format":
        if ("validation" in issue) {
          switch ((issue as any).validation) {
            case "email":
              errorType = "email";
              break;
            case "url":
              errorType = "url";
              break;
            case "uuid":
              errorType = "uuid";
              break;
            case "regex":
              errorType = "regex";
              break;
            case "datetime":
              errorType = "datetime";
              break;
            case "ip":
              errorType = "ip";
              break;
            default:
              errorType = "format";
              break;
          }
        } else {
          errorType = "format";
        }
        break;

      case "invalid_type":
        if ("expected" in issue) {
          switch ((issue as any).expected) {
            case "string":
              errorType = "string";
              break;
            case "number":
              errorType = "number";
              break;
            case "boolean":
              errorType = "boolean";
              break;
            case "date":
              errorType = "date";
              break;
            case "array":
              errorType = "array";
              break;
            case "object":
              errorType = "object";
              break;
            default:
              errorType = "type";
              break;
          }
        } else {
          errorType = "type";
        }
        break;

      case "invalid_union":
        errorType = "union";
        break;

      case "invalid_value":
        errorType = "enum";
        break;

      case "invalid_element":
        errorType = "element";
        break;

      case "invalid_key":
        errorType = "key";
        break;

      case "not_multiple_of":
        errorType = "multiple";
        break;

      case "unrecognized_keys":
        errorType = "unknown_keys";
        break;

      case "custom":
        errorType = "custom";
        break;

      default:
        errorType = "invalid";
    }

    errors[field][errorType] = issue.message;
  });

  return errors;
}

export function addUniqueError(
  errors: Record<string, Record<string, string>>,
  field: string,
  message: string
) {
  if (!errors[field]) {
    errors[field] = {};
  }

  errors[field]["unique"] = message;
  return errors;
}
