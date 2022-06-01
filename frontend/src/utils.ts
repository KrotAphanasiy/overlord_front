import { toast } from "react-toastify";

export const copy = (text: string | number | boolean) => {
  try {
    navigator.clipboard.writeText(text.toString());
    toast.success("Скопированно");
  } catch (e) {
    toast.error("Ошибка при копировании");
  }
};

export const imageSource = (href: string) =>
  // @ts-ignore
  `${window.__alprConfig.IMAGES_SRC}/${href}`;

export const toInt = (value: any) => {
  const parsed = parseInt(value);
  return isNaN(parsed) ? 0 : parsed;
};

export const applyDefaults = <T extends object>(
  object: Partial<T>,
  defaults: T
) => {
  for (const key in defaults)
    if (!object.hasOwnProperty(key)) object[key] = defaults[key];

  return object;
};
