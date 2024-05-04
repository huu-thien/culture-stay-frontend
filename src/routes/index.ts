export const routes = {
  home: {
    generatePath: () => '/',
  },
  authenticate: {
    generatePath: () => '/authenticate',
  },
  detailProperty: {
    generatePath: (id) => `/detail-property/${id}`,
  },
  hostInfomation: {
    generatePath: (id) => `/host-infomation/${id}`,
  },
  guestInfomation: {
    generatePath: (id) => `/guest-infomation/${id}`,
  },
}
