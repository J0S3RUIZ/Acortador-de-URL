export async function parseApiError(response) {
  if (!response) return "Error desconocido";
  try {
    const data = await response.json();
    if (!data) return response.statusText || "Error desconocido";

    // express-validator returns { errors: [ { msg, param, ... } ] }
    if (data.errors && Array.isArray(data.errors)) {
      return data.errors.map((e) => (e.msg ? `${e.param ? e.param + ': ' : ''}${e.msg}` : JSON.stringify(e))).join(", ");
    }

    // our controllers sometimes return { error: '...' }
    if (data.error) return data.error;

    // fallback: try message or statusText
    if (data.message) return data.message;

    return response.statusText || "Error desconocido";
  } catch {
    return response.statusText || "Error desconocido";
  }
}

export default parseApiError;
