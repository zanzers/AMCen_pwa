export default function calculateSTLEstimation({width, height, depth }) {

  const volumeFactor =
    width * height * depth;

  const normalizedVolume =
    Math.cbrt(volumeFactor);


  const estimatedHours = Math.min(
    72,
    Math.max(1, normalizedVolume * 2)
  );

  const hourlyRate = 60;

  const estimatedCost =
    estimatedHours * hourlyRate;

  return {
    estimatedHours,
    estimatedCost,
  };
}