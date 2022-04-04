import { NextFunction } from 'express'

export const Validate = schema => async (req: any, _, next: NextFunction) => {
   try {
      await schema.validate({
         body: req.body,
         query: req.query,
         params: req.params,
      })
      return next()
   } catch (error: any) {
      return next({
         message: error.message || 'Validation Failed',
         error,
      })
   }
}
