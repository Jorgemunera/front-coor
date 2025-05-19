import api from "./api";
import { type Filters } from "../types/Filters";
import { type ReportEntry } from "../types/ReportEntry";

export const getReportData = async (
  filters: Filters
): Promise<{ details: ReportEntry[]; total: number }> => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== "" && v !== undefined && v !== null)
  );
  const response = await api.get("/reports/orders", { params: cleanFilters });
  return {
    details: response.data.data,
    total: response.data.total,
  };
};
