import { BusinessPo } from '@/entity/common/base'

export interface AccountDept extends BusinessPo {
	address: string
	contacts: string
	deptCode: string
	deptLeader: string
	deptLevel: number
	deptName: string
	deptType: string
	email: string
	fax: string
	fkOrgId: string
	fkParentCode: string
	fkParentId: string
	phone: string
	phoneCornet: string
	sortCode: number
}
