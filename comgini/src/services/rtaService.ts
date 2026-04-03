import api from "../api/api"

export interface ISINRecord {
  id: number
  company_name: string
  cin: string
  rta_name: string
  security_type: string
  reference_no: string
  created_at: string
}

export interface CreateISINPayload {
  cin: string
  depository: string
  security_type: string
  security_name: string
  face_value: number
  paid_up_value: number
  approval_mode: string
  meeting_date: string
  meeting_time: string
  authorized_signatory1: number
  authorized_signatory2: number
  signing_signatory1: number
  signing_signatory2: number
  signing_date: string
  signing_place: string
  declaration_signatory: number
  declaration_date: string
  declaration_place: string
  networth_date: string
  paid_up_capital: number
  reserve_surplus: number
  accumulated_losses: number
  misc_expenditure: number
  total_networth: number
  outstanding_shares: number
  book_value: number
  signing_category: string
  pcs_pca_id: number
  firm_name: string
  firm_address: string
  membership_no: string
}

const rtaService = {
  /** GET ALL ISIN CREATION RECORDS */
  getISINRecords: async (page: number = 1, limit: number = 10, search: string = "") => {
    try {
      const response = await api.get("/rta-services/isin", {
        params: { page, limit, search }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  /** CREATE ISIN RECORD */
  createISIN: async (payload: CreateISINPayload) => {
    try {
      const response = await api.post("/rta-services/isin", payload)
      return response.data
    } catch (error) {
      throw error
    }
  },

  /** UPLOAD MGT-7/7A FOR AUTOFILL */
  uploadMGT: async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      const response = await api.post("/rta-services/upload-mgt", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default rtaService
