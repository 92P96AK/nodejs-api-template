import { isFinite } from 'lodash';
import { RequestQueryDto } from '../../interfaces';

export const requestQueryTransformer = () => {
    return (req, res, next) => {
        const pageSize = parseInt(req.query["pageSize"], 10)
        const limit = parseInt(req.query["limit"], 10)
        const requestquery: RequestQueryDto = {}
        requestquery.keyword = req.query["keyword"] || ""
        requestquery.pageSize = isFinite(pageSize) ? pageSize : 0;
        requestquery.limit = isFinite(limit) ? limit : 12;
        requestquery.sortBy = req.query["sortBy"] || ""
        requestquery.sortValue = req.query["sortValue"] || ""

        req.requestQuery = requestquery
        next();
    };
};
