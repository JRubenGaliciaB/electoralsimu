import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LayerType, Simulator } from '../types';

// 1. Define la interfaz del Contexto
interface LayerControlContextType {
  // Base Maps
  activeLayer: LayerType;
  onLayerChange: (layer: LayerType) => void;
  isBaseMapsOpen: boolean;
  setIsBaseMapsOpen: (isOpen: boolean) => void;

  // Overlays
  showDistricts: boolean;
  toggleDistricts: () => void;
  showElectionResults: boolean;
  toggleElectionResults: () => void;
  showElectionResults21: boolean;
  toggleElectionResults21: () => void;
  showElectionResults18: boolean;
  toggleElectionResults18: () => void;

  // --- Modo Simulador ---
  simulationMode: boolean;
  setSimulationMode: (e: boolean) => void;

  showSimulationResults: boolean;
  toggleSimulationResults: () => void;

  activeScenario?: Simulator;
  setActiveScenario: (s?: Simulator) => void;
}

// 2. Crea el Contexto
const LayerControlContext = createContext<LayerControlContextType | undefined>(undefined);

// 3. Provider
interface LayerControlProviderProps {
  children: ReactNode;
}

export const LayerControlProvider: React.FC<LayerControlProviderProps> = ({ children }) => {
  const [activeLayer, setActiveLayer] = useState<LayerType>(LayerType.DARK);
  const [isBaseMapsOpen, setIsBaseMapsOpen] = useState(false);

  const [showDistricts, setShowDistricts] = useState(true);
  const [showElectionResults, setShowElectionResults] = useState(false);
  const [showElectionResults21, setShowElectionResults21] = useState(false);
  const [showElectionResults18, setShowElectionResults18] = useState(false);

  // --- Estado del simulador ---
  const [simulationMode, setSimulationMode] = useState(false);
  const [showSimulationResults, setShowSimulationResults] = useState(false);
  const [activeScenario, setActiveScenario] = useState<Simulator | undefined>(undefined);

  const contextValue: LayerControlContextType = {
    // Base Maps
    activeLayer,
    onLayerChange: setActiveLayer,
    isBaseMapsOpen,
    setIsBaseMapsOpen,

    // Overlays
    showDistricts,
    toggleDistricts: () => setShowDistricts(prev => !prev),

    showElectionResults,
    toggleElectionResults: () => setShowElectionResults(prev => !prev),

    showElectionResults21,
    toggleElectionResults21: () => setShowElectionResults21(prev => !prev),

    showElectionResults18,
    toggleElectionResults18: () => setShowElectionResults18(prev => !prev),

    // --- Simulador ---
    simulationMode,
    setSimulationMode,

    showSimulationResults,
    toggleSimulationResults: () => setShowSimulationResults(prev => !prev),

    activeScenario,
    setActiveScenario,
  };

  return (
    <LayerControlContext.Provider value={contextValue}>
      {children}
    </LayerControlContext.Provider>
  );
};

// 4. Hook
export const useLayerControls = () => {
  const context = useContext(LayerControlContext);
  if (context === undefined) {
    throw new Error('useLayerControls must be used within a LayerControlProvider');
  }
  return context;
};
