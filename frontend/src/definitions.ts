// @ts-nocheck

export const fetchConfig = async () => {
  if (window.__alprConfig) return window.__alpr_config;
  const fetchedConfig = await fetch('/config.json').then(res => res.json());
  console.log('Loaded config successfuly: ', fetchedConfig);
  window.__alprConfig = fetchedConfig; 

  return window.__alprConfig;
}

window.__fetchConfig = fetchConfig;
