export const setCookie = (name, value, days = 0.08) => {
  // cookie 默认2小时过期
  const Days = days;
  const exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);

  const hostName = window.location.hostname;
  const domainName = hostName.split('.').slice(-2).join('.');

  document.cookie = `${name}=${escape(
    value,
  )};expires=${exp.toUTCString()};path=/;`;
  
  document.cookie = `${name}=${escape(
    value,
  )};expires=${exp.toUTCString()};path=/;domain=${domainName};`;

  document.cookie = `${name}=${escape(
    value,
  )};expires=${exp.toUTCString()};path=/;domain=.${domainName};`;
};

export const getCookie = (name: string) => {
  let arr,
    reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
};