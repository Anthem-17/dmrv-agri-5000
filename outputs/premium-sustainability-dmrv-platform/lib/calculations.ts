import { clamp, formatNumber } from "@/lib/utils";

export interface CarbonInput {
  landSize: number;
  trees: number;
  fuelUsage: number;
  electricityUsage: number;
  waterUsage: number;
  fertilizerUsage?: number;
}

export function calculateEmissions(input: CarbonInput) {
  const fertilizerUsage = input.fertilizerUsage ?? 0;
  const fuel = input.fuelUsage * 2.67;
  const electricity = input.electricityUsage * 0.42;
  const water = input.waterUsage * 0.004;
  const fertilizer = fertilizerUsage * 1.8;
  const landImpact = input.landSize * 0.08;
  const sequestration = input.trees * 0.2;

  const emissions = fuel + electricity + water + fertilizer + landImpact;
  const offset = sequestration;
  const net = Math.max(0, emissions - offset);
  const credits = Math.max(0, Math.round(offset * 4.2));

  const environmental = clamp(Math.round(100 - net * 2.2), 30, 98);
  const social = clamp(Math.round(72 + input.trees / 20), 40, 97);
  const governance = clamp(Math.round(70 + input.landSize / 35), 38, 96);
  const overall = Math.round((environmental + social + governance) / 3);

  return {
    emissions,
    offset,
    net,
    credits,
    environmental,
    social,
    governance,
    overall
  };
}

export function annualProjection(monthlyNet = 12) {
  return formatNumber(monthlyNet * 12, 1);
}

export function creditsToPrice(credits: number) {
  return Math.round(credits * 18.5);
}
