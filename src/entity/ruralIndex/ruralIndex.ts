import { BusinessPo } from '../common/base'

/**
 * 连心服务实体类
 */
export interface DefiledIndexVo extends BusinessPo {
	//农村id
	fkRuralId: string
	//微调研（办事）数
	researchNumber: number
	//微排调研（办事）比率%
	researchRatio: number
	//农村名称
	rfRuralName: string
	//群众满意度%
	satisfactionRatio: number
	//微排查（力量）数
	screeningNumber: number
	//微排查（力量）同比率%
	screeningRatio: number
	//微安全（民情）数
	securityNumber: number
	//微安全比（民情）率%
	securityRatio: number
	//年份
	statisticsYear: number
	//微走访数
	visitNumber: number
	//微走访同比率%
	visitRatio: number
	[key: string]: unknown
}

/**
 * 集体经济实体类
 */
export interface CollectiveEconomyVo extends BusinessPo {
	// 全区平均/万元
	averageIncome: number
	// 农村id
	fkRuralId: string
	// 经营性收入全区平均/万元
	operatingAverageIncome: number
	// 经营性收入/万元
	operatingIncome: number
	// 经常性收入全区平均/万元
	recurringAverageIncome: number
	// 经常性收入/万元
	recurringIncome: number
	// 农村名称
	rfRuralName: string
	// 年份
	statisticsYear: number
}

/**
 * 党组织活动实体类
 */
export interface PartyActivitiesVo extends BusinessPo {
	//活动数量
	activitiesNumber: number
	//活动参与率
	activitiesRatio: number
	//农村id
	fkRuralId: string
	//农村名
	rfRuralName: string
	//月份
	statisticsMonth: string
}

/**
 * 党支部人员分布情况实体类
 */
export interface PersonnelDistributeVo {
	//农村党支部人员分布情况-表
	distributeList: Array<DistributeVo>
	//类型名称
	typeName: string
	icon: string
	// [key: string]: unknown
}
export interface DistributeVo extends BusinessPo {
	//分布区间名称（数据字典）
	distributionIntervalName: string
	//分布数量
	distributionNumber: number
	//分布区间id（数据字典）
	fkDistributionIntervalId: string
	//农村id
	fkRuralId: string
	//类型id（数据字典）
	fkTypeId: string
	//党支部名称
	partyBranchName: string
	//农村名称
	rfRuralName: string
	//类型名称（数据字典）
	typeName: string
}

/**
 * 强基指数排名实体类
 */
export interface EvaluationRakingVo extends BusinessPo {
	//区排名
	countyRanking: number
	//上级部门id（所属镇id）
	fkParentDeptId: string
	//农村id
	fkRuralId: string
	//荣誉分（农村详情表）
	honorPoints: number
	//农村名称
	rfRuralName: string
	//年份
	statisticsYear: number
	//总分
	totalScore: number
	//镇排名
	townRanking: number
}

/**
 * 强基指数测评分实体类
 */
export interface EvaluationVo extends BusinessPo {
	//指标分数
	criteriaScore: number
	//测评分
	evaluationScore: number
	//审批记录id
	fkApprovalId: string
	//农村id
	fkRuralId: string
	//建设标准类型id（一级指标id）
	fkTypeId: string
	//农村名称
	rfRuralName: string
	//年份
	statisticsYear: number
	//建设标准类型名称（一级指标名称）
	typeName: string
}
