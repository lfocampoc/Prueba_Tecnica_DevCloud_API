import { Config } from '@config/index';

const { urlApiService } = Config.api;

const ServicesRoutes = {
  loginUsers: {
    requiredAuth: false,
    url: urlApiService + '/login',
  },
  getVms: {
    requiredAuth: false,
    url: urlApiService + '/vms',
  },
  setVms: {
    requiredAuth: true,
    url: urlApiService + '/vms',
  },
  putVms: {
    requiredAuth: true,
    url: urlApiService + '/vms/:idVms',
  },
  deleteVms: {
    requiredAuth: true,
    url: urlApiService + '/vms/:idVms',
  }
};

const buildRoute = (path: any, params: any) => {
  const route = Object.assign({}, path);

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      route.url = route.url.replace(new RegExp(':' + key, 'g'), encodeURIComponent(params[key]) );
    }
  }

  return route;
};

export { buildRoute, ServicesRoutes };
