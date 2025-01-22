import captureErrorsMiddleware from '../middlewares/captureErrorsMiddleware';
import perfMiddleware from '../middlewares/perfMiddleware';
import { procedure } from '../trpc';

const publicProcedure = procedure
  .use(captureErrorsMiddleware)
  .use(perfMiddleware);

export default publicProcedure;
