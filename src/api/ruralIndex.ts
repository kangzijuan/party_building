import { GetRequestModel, QueryType } from '../http/request-model'
import {
	CollectiveEconomyVo,
	DefiledIndexVo,
	EvaluationRakingVo,
	EvaluationVo,
	PartyActivitiesVo,
	PersonnelDistributeVo
} from '../entity/ruralIndex/ruralIndex'
import { GeoJSON } from 'echarts/types/src/coord/geo/geoTypes'

const prefix = '/ruralIndex'
export default {
	defiledIndex: (query: QueryType) => new GetRequestModel<DefiledIndexVo>(`${prefix}/getRuralDefiledIndexByFkRuralId?fkRuralId=${query}`).request(),
	collectiveEconomy: (query: QueryType) =>
		new GetRequestModel<Array<CollectiveEconomyVo>>(`${prefix}/getRuralCollectiveEconomyByFkRuralId?fkRuralId=${query}`).request(),
	partyActivities: (query: QueryType) =>
		new GetRequestModel<Array<PartyActivitiesVo>>(`${prefix}/getRuralPartyActivitiesByFkRuralId?fkRuralId=${query}`).request(),
	personnelDistribute: (query: QueryType) =>
		new GetRequestModel<Array<PersonnelDistributeVo>>(`${prefix}/getRuralPartyBranchPersonnelDistributeByFkRuralId
		?fkRuralId=${query}`).request(),
	evaluationRaking: (query: QueryType) =>
		new GetRequestModel<EvaluationRakingVo>(`${prefix}/getProjectEvaluationRakingByFkRuralId?fkRuralId=${query}`).request(),
	evaluation: (query: QueryType) => new GetRequestModel<Array<EvaluationVo>>(`${prefix}/getRuralProjectEvaluationByFkRuralId?fkRuralId=${query}`).request(),
	gridDistribution: (query: QueryType) => new GetRequestModel<GeoJSON>(`${prefix}/getRuralGridDistributionMapByFkRuralId?fkRuralId=${query}`).request()
}
