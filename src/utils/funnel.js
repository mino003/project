export const validateFunnelStep = (step) => {
  const validTypes = ['landing', 'upsell', 'downsell', 'checkout'];
  
  if (!validTypes.includes(step.type)) {
    throw new Error(`Invalid step type. Must be one of: ${validTypes.join(', ')}`);
  }

  if (!step.name || typeof step.name !== 'string') {
    throw new Error('Step name is required and must be a string');
  }

  if (!step.content || typeof step.content !== 'object') {
    throw new Error('Step content is required and must be an object');
  }

  return true;
};

export const calculateFunnelMetrics = (steps) => {
  let totalVisitors = 0;
  let completions = 0;
  const stepMetrics = [];

  steps.forEach((step, index) => {
    if (index === 0) {
      totalVisitors = step.visitors;
    }
    
    const conversionRate = step.visitors > 0 
      ? (step.completions / step.visitors) * 100 
      : 0;

    stepMetrics.push({
      ...step,
      conversionRate: parseFloat(conversionRate.toFixed(2)),
      dropOff: step.visitors - step.completions
    });

    if (index === steps.length - 1) {
      completions = step.completions;
    }
  });

  return {
    totalVisitors,
    completions,
    conversionRate: totalVisitors > 0 
      ? parseFloat(((completions / totalVisitors) * 100).toFixed(2))
      : 0,
    stepMetrics
  };
};