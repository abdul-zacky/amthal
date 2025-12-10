import Link from "next/link";
import Image from "next/image";
import { BarChart3, Building2, Brain, Map, MessageSquare, LineChart, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-[#276FB0]/30 to-[#134474]/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#134474]/30 to-[#0D263F]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12 relative">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#276FB0]/20 to-[#134474]/20 rounded-full blur-2xl"></div>
              <Image
                src="/assets/main.png"
                alt="AMTHAL Logo"
                width={200}
                height={200}
                priority
                className="relative drop-shadow-2xl"
              />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#276FB0] via-[#134474] to-[#276FB0] bg-clip-text text-transparent">
            AMTHAL
          </h1>
          <p className="text-2xl text-[#134474] mb-2 font-semibold">
            AI-Powered EV Charging Infrastructure Platform
          </p>
          <p className="text-lg text-gray-600">
            Manhattan Smart City Initiative
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Scenario Comparison Tool */}
          <Link
            href="/scenario-comparison"
            className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-[#276FB0]/50 transition-all hover:shadow-2xl hover:shadow-[#276FB0]/30 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#276FB0]/10 to-[#134474]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#276FB0] to-[#134474] rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[#0D263F] group-hover:text-[#276FB0] transition-colors">
                Scenario Comparison
              </h3>
              <p className="text-gray-600 mb-4">
                Bandingkan strategi Maximum Coverage, Equity Focus, dan Cost Optimization dalam satu layar
              </p>
              <div className="flex items-center text-[#276FB0] font-semibold">
                Open Tool
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>

          {/* 3D City Modelling */}
          <Link
            href="/3d-city-modelling"
            className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-[#276FB0]/50 transition-all hover:shadow-2xl hover:shadow-[#276FB0]/30 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#276FB0]/10 to-[#134474]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#276FB0] to-[#134474] rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[#0D263F] group-hover:text-[#276FB0] transition-colors">
                3D City Modelling
              </h3>
              <p className="text-gray-600 mb-4">
                Visualisasi 3D kota dengan AR, simulasi aliran kendaraan, dan shadow analysis
              </p>
              <div className="flex items-center text-[#276FB0] font-semibold">
                Open Tool
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>

          {/* AI Demand Prediction */}
          <Link
            href="/demand-prediction"
            className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-[#276FB0]/50 transition-all hover:shadow-2xl hover:shadow-[#276FB0]/30 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#276FB0]/10 to-[#134474]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#276FB0] to-[#134474] rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[#0D263F] group-hover:text-[#276FB0] transition-colors">
                AI Demand Prediction
              </h3>
              <p className="text-gray-600 mb-4">
                Model adopsi EV per distrik dengan machine learning dan heatmap visualization
              </p>
              <div className="flex items-center text-[#276FB0] font-semibold">
                Open Tool
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Geospatial Optimizer */}
          <Link
            href="/geospatial"
            className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-[#276FB0]/50 transition-all hover:shadow-2xl hover:shadow-[#276FB0]/30 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#276FB0]/10 to-[#134474]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#276FB0] to-[#134474] rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Map className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[#0D263F] group-hover:text-[#276FB0] transition-colors">
                Geospatial Optimizer
              </h3>
              <p className="text-gray-600 mb-4">
                Peta interaktif dengan mesin optimasi multi-objektif untuk rekomendasi lokasi optimal
              </p>
              <div className="flex items-center text-[#276FB0] font-semibold">
                Open Tool
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Gemini AI Chatbot */}
          <Link
            href="/chatbot"
            className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-[#276FB0]/50 transition-all hover:shadow-2xl hover:shadow-[#276FB0]/30 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#276FB0]/10 to-[#134474]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#276FB0] to-[#134474] rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[#0D263F] group-hover:text-[#276FB0] transition-colors">
                Gemini AI Chatbot
              </h3>
              <p className="text-gray-600 mb-4">
                Tanya jawab natural language untuk analisis coverage, rekomendasi, dan ringkasan eksekutif
              </p>
              <div className="flex items-center text-[#276FB0] font-semibold">
                Open Tool
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Analytics Dashboard */}
          <Link
            href="/analytics"
            className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-[#276FB0]/50 transition-all hover:shadow-2xl hover:shadow-[#276FB0]/30 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#276FB0]/10 to-[#134474]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#276FB0] to-[#134474] rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <LineChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[#0D263F] group-hover:text-[#276FB0] transition-colors">
                Analytics Dashboard
              </h3>
              <p className="text-gray-600 mb-4">
                Real-time monitoring, KPI tracking, dan comprehensive reporting system
              </p>
              <div className="flex items-center text-[#276FB0] font-semibold">
                Open Tool
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-2xl">
            <p className="text-[#134474] font-semibold mb-2 flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5 text-[#276FB0]" />
              Demo Version - Built for Smart City Initiative
            </p>
            <p className="text-sm text-gray-600">
              Phase 1: Scenario Comparison & Analysis Tools
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
