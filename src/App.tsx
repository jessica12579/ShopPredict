import React, { useState } from 'react';
import { BarChart3, Bot, ChevronDown, Send, Loader2, TrendingUp, Users, ShoppingCart, Target, Brain, Zap, AlertTriangle, X, MessageCircle } from 'lucide-react';

function App() {
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [showPrediction, setShowPrediction] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setIsLoading(true);
    setShowPrediction(false);

    const payload = {
      mensaje: chatInput.trim()
    };
    console.log("📤 Enviando al backend:", payload);
    
    try {
      const response = await fetch('https://api-backend-proyecto-final-especializacion-951527847571.us-central1.run.app/conversar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("🔎 Respuesta del backend:", data);

      let formattedPrediction = '';
      if (data.prediccion !== undefined) {
        formattedPrediction = data.prediccion;
      } else if (data.response) {
        formattedPrediction = data.response;
      } else {
        formattedPrediction = 'Respuesta recibida del servidor';
      }

      setPrediction(formattedPrediction);
      setShowPrediction(true);
    } catch (error) {
      console.error('Error calling API:', error);
      setPrediction('❌ Error al conectar con el servidor. Por favor, intenta nuevamente.');
      setShowPrediction(true);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  const clusters = [
    {
      id: 3,
      name: "Usuarios de alto valor",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      icon: <Zap className="h-6 w-6" />,
      conversion: "28.5%",
      description: "Alta variabilidad e interacción. Usuarios comprometidos, mayor duración, más páginas y mayor valor generado.",
      profile: "Compradores Activos",
      characteristics: "+Interacción, −Rebote, −Salida"
    },
    {
      id: 1,
      name: "Usuarios promedio",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-800",
      icon: <Users className="h-6 w-6" />,
      conversion: "15.9%",
      description: "Compacto, con comportamiento medio. Conversión por encima del promedio.",
      profile: "Exploradores Moderados",
      characteristics: "Cerca del promedio, pero receptivos"
    },
    {
      id: 0,
      name: "Usuarios en días especiales",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      icon: <Target className="h-6 w-6" />,
      conversion: "6.1%",
      description: "Muy parecido al clúster 1, pero con mayor presencia en fechas clave.",
      profile: "Visitantes Ocasionales",
      characteristics: "Alta actividad en días especiales, bajo compromiso"
    },
    {
      id: 2,
      name: "Usuarios de rebote",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      icon: <AlertTriangle className="h-6 w-6" />,
      conversion: "0.6%",
      description: "Patrón uniforme, baja interacción y tasa de conversión mínima.",
      profile: "Rebotadores",
      characteristics: "Tráfico irrelevante, rebote/salida muy altos"
    }
  ];

  const strategies = [
    {
      cluster: "Cluster 3: VIP Estambul/İzmir",
      recommendation: "Eventos exclusivos en noviembre → pico de conversión.",
      color: "bg-red-50 border-red-200 text-red-800"
    },
    {
      cluster: "Cluster 1: Firefox + diciembre/marzo",
      recommendation: "Promociones estacionales → conversión potencial.",
      color: "bg-orange-50 border-orange-200 text-orange-800"
    },
    {
      cluster: "Cluster 0: Visitantes de mayo (Estambul/Ankara)",
      recommendation: "Retargeting post-evento en esas ciudades.",
      color: "bg-blue-50 border-blue-200 text-blue-800"
    },
    {
      cluster: "Cluster 2: Tráfico tóxico",
      recommendation: "Depuración de fuentes (Syndication, navegadores obsoletos).",
      color: "bg-green-50 border-green-200 text-green-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-800">ShopPredict</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('dashboard')}
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                Dashboard
              </button>
              <button 
                onClick={() => scrollToSection('clustering')}
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                Análisis de Clústeres
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="pt-8 pb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              Predicción Inteligente de
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Compras Online</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Plataforma avanzada de análisis predictivo basada en el dataset UCI de intención de compra. 
              Analiza comportamiento de usuarios y predice probabilidades de conversión en tiempo real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                <Users className="h-5 w-5" />
                <span className="font-medium">12,330 sesiones analizadas</span>
              </div>
              <div className="flex items-center space-x-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Columbia.com.tr dataset</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
                <BarChart3 className="h-5 w-5" />
                <span className="font-medium">Precisión 85%+</span>
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>Explorar Dashboard</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Section - Enhanced */}
      <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full mb-6 font-medium">
              <BarChart3 className="h-5 w-5" />
              <span>Analytics Dashboard</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Dashboard Interactivo
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Visualización en tiempo real de patrones de comportamiento, métricas de conversión 
              e insights predictivos basados en el dataset de Columbia.com.tr
            </p>
          </div>

          <div className="bg-white rounded-3xl p-2 shadow-2xl border border-slate-200">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="w-full overflow-hidden rounded-2xl shadow-lg">
                <iframe 
                  width="100%" 
                  height="900" 
                  src="https://lookerstudio.google.com/embed/reporting/8becebfe-452b-4e8b-8cf1-e4875c36ff58/page/BBaNF" 
                  frameBorder="0" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  className="w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clustering Analysis Section */}
      <section id="clustering" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-6 py-3 rounded-full mb-6 font-medium">
              <Brain className="h-5 w-5" />
              <span>Análisis de Clustering</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Clústeres de Comportamiento
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Segmentación inteligente de usuarios basada en algoritmos K-Means y análisis de componentes principales
            </p>
          </div>

          {/* PCA Visualization */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Visualización de Clústeres de Comportamiento (PCA)
              </h3>
              <div className="flex justify-center mb-8">
                <img 
                  src="/imagen_2025-06-14_163347012.png" 
                  alt="Visualización PCA de clústeres de comportamiento"
                  className="max-w-full h-auto rounded-2xl shadow-lg border border-slate-200"
                />
              </div>
              <p className="text-slate-600 text-center max-w-4xl mx-auto leading-relaxed">
                En esta visualización se proyectaron sesiones de usuario usando Análisis de Componentes Principales (PCA). 
                Cada punto representa una sesión y el color indica a qué clúster fue asignado por el algoritmo K-Means. 
                Se observa un grupo claramente dominante (clúster rojo) y otros más compactos y homogéneos.
              </p>
            </div>
          </div>

          {/* Cluster Distribution */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Distribución Visual y Descripción de Clústeres
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {clusters.map((cluster) => (
                <div key={cluster.id} className={`${cluster.bgColor} ${cluster.borderColor} border-2 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`bg-gradient-to-r ${cluster.color} p-3 rounded-xl text-white shadow-lg`}>
                      {cluster.icon}
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold ${cluster.textColor}`}>
                        Clúster {cluster.id} – {cluster.name}
                      </h4>
                      <div className={`text-2xl font-bold ${cluster.textColor} mt-1`}>
                        Conversión: {cluster.conversion}
                      </div>
                    </div>
                  </div>
                  <p className={`${cluster.textColor} leading-relaxed`}>
                    {cluster.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Table */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Análisis de Perfiles por Variables Categóricas
            </h3>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-100 to-blue-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Clúster</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Perfil</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Conversión</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Características Clave</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {clusters.map((cluster, index) => (
                      <tr key={cluster.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className={`bg-gradient-to-r ${cluster.color} p-2 rounded-lg text-white`}>
                              {cluster.icon}
                            </div>
                            <span className="font-semibold text-slate-800">{cluster.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-800">{cluster.profile}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${cluster.bgColor} ${cluster.textColor}`}>
                            {cluster.conversion}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{cluster.characteristics}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Strategic Segmentation */}
          <div>
            <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Propuesta de Segmentación Estratégica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategies.map((strategy, index) => (
                <div key={index} className={`${strategy.color} border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <h4 className="font-bold text-lg mb-3">{strategy.cluster}</h4>
                  <p className="leading-relaxed">{strategy.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-slate-800">ShopPredict</span>
          </div>
          <p className="text-slate-600">
            Basado en el dataset UCI "Online Shoppers Purchasing Intention" • 
            Desarrollado con React + Machine Learning
          </p>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatbotOpen && (
          <button
            onClick={toggleChatbot}
            className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        )}

        {/* Floating Chatbot Panel */}
        {isChatbotOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-96 max-w-[calc(100vw-2rem)] max-h-[80vh] overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-white" />
                <span className="text-white font-semibold">Predicción IA</span>
              </div>
              <button
                onClick={closeChatbot}
                className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <p className="text-slate-600 mb-4 text-sm">
                Describe el comportamiento de un usuario y obtén predicciones instantáneas sobre la probabilidad de compra.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <textarea
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ejemplo: Usuario visitó 30 páginas en enero durante fin de semana con 120 segundos de interacción..."
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !chatInput.trim()}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 disabled:cursor-not-allowed text-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Analizando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Obtener Predicción</span>
                    </>
                  )}
                </button>
              </form>

              {/* Prediction Result */}
              {showPrediction && (
                <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Bot className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-800 mb-1">Resultado del Análisis</h4>
                      <pre className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {prediction}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Examples */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">Ejemplos rápidos:</h4>
                <div className="space-y-1">
                  {[
                    "Usuario Firefox, octubre, 5 páginas, 60 segundos",
                    "Cliente enero, Chrome, Linux, 1 página, 5 segundos",
                    "Visitante fin de semana, 10 páginas admin, 10 segundos"
                  ].map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setChatInput(example)}
                      className="block w-full text-left p-2 bg-slate-50 hover:bg-emerald-50 rounded text-xs text-slate-600 hover:text-emerald-700 transition-colors border border-slate-200 hover:border-emerald-200"
                    >
                      "{example}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
             
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;