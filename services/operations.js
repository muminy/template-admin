import { instance, _operations } from "./urls";

export async function handleGetOperations(token) {
  const operations = await instance.get(_operations, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return operations.data;
}

export async function handleCreateOperations(token, payload) {
  const operations = await instance.post(_operations, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return operations.data;
}

export async function handleUpdateOperations(token, payload) {
  const operations = await instance.patch(_operations, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return operations.data;
}
