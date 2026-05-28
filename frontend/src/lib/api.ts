const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

type ApiOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { auth = false, headers, ...init } = options;
  const token = auth ? localStorage.getItem("scoops_token") : null;
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  let data: any = null;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json().catch(() => null);
  }

  if (!response.ok) {
    if (data?.error) {
      throw new Error(data.error);
    }
    if (response.status === 504 || response.status === 502 || response.status === 503) {
      throw new Error("Backend server is not running or unreachable. Please ensure the backend server is started on port 5000.");
    }
    throw new Error(`Request failed with status ${response.status}`);
  }

  return data as T;
}
