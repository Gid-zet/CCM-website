// Brain regions shown in the Leadership Lens (kept separate so three.js loads lazily).
export type Region = 'thalamus' | 'pfc' | 'hippocampus' | 'amygdala' | 'brainstem';

export const REGIONS: Record<Region, { name: string; role: string; color: string; pos: [number, number, number][]; info: string }> = {
  thalamus: { name: 'Thalamus', role: 'The relay station', color: '#d56bb4', pos: [[0, 0.04, 0.0]],
    info: 'Every sight and sound passes through here first. It sends the signal two ways: a fast road to the amygdala and a slower road to the thinking brain.' },
  pfc: { name: 'Prefrontal cortex', role: 'The thinking brain', color: '#8dd8f7', pos: [[-0.3, 0.36, 0.92], [0.3, 0.36, 0.92]],
    info: 'Interprets the event through your lens, weighs options and chooses a response. When you pause, it can calm the amygdala.' },
  hippocampus: { name: 'Hippocampus', role: 'The memory keeper', color: '#9ecb3c', pos: [[-0.34, -0.2, -0.12], [0.34, -0.2, -0.12]],
    info: 'Pulls in past experiences that look similar to this moment, adding context and, sometimes, old emotion.' },
  amygdala: { name: 'Amygdala', role: 'The alarm', color: '#fca927', pos: [[-0.34, -0.22, 0.34], [0.34, -0.22, 0.34]],
    info: 'Scans for threat or reward and fires in milliseconds, often before the thinking brain has caught up.' },
  brainstem: { name: 'Brainstem & body', role: 'The reaction', color: '#ff7a70', pos: [[0, -0.86, -0.46]],
    info: 'Turns the alarm into a body response: heart rate, tension and the urge to fight, flee, freeze or appease.' },
};

