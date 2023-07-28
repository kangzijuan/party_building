import { BasePo, BusinessPo } from '@/entity/common/base'

export interface AccountThirdParty extends BasePo {
	appOpenId: string
	appType: string
	appUserId: string
	appUserName: string
	fkUserId: string
}
