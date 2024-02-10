export interface BaseStorageInterface {
  read: () => void;
  write: () => void;
  delete: () => void;
}
