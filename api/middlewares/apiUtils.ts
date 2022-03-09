import { isFinite } from 'lodash';
import { RequestQueryDto } from '../../interfaces';

module.exports = function apiMethods() {
    return (req, res, next) => {
        const pageSize=parseInt(req.query["pageSize"], 10)
        const limit=parseInt(req.query["limit"], 10)
        const requestquery: RequestQueryDto = {}
        requestquery.keyword = req.query["keyword"] || ""
        requestquery.pageSize = isFinite(pageSize) ? pageSize : 0;
        requestquery.limit = isFinite(limit) ? limit : 12;
        requestquery.sort_by = req.query["sort_by"] || ""
        requestquery.sort_value = req.query["sort_value"] || ""

        req.requestQuery=requestquery
        next();
    };
};
