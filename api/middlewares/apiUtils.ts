import { isFinite } from 'lodash'
import { RequestQueryDto } from '../../interfaces'

export const requestQueryTransformer = (req, _, next) => {
   const pageSize = parseInt(req.query['pageSize'], 12)
   const page = parseInt(req.query['page'], 12)
   const requestquery: RequestQueryDto = {}
   requestquery.keyword = req.query['keyword'] || ''
   requestquery.pageSize = isFinite(pageSize) ? pageSize : 12
   requestquery.page = isFinite(page) ? page || 1 : 1
   requestquery.offset = (requestquery.page - 1) * requestquery.pageSize
   requestquery.sortBy = req.query['sortBy'] || ''
   requestquery.sortValue = req.query['sortValue'] || ''
   req.requestQuery = requestquery
   next()
}
