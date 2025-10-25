import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  Lightbulb,
} from "lucide-react";

export function SmartCitySidebar() {
  const location = useLocation();

  return (
    <Sidebar className="w-64">
      <SidebarContent className="bg-card border-r border-border">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-primary flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-background" />
            </div>
            <div>
              <h2 className="font-bold text-lg">LumenAI</h2>
              <p className="text-xs text-muted-foreground">Smart City Control</p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <SidebarGroup>
          <SidebarGroupLabel>System Status</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-3 py-2 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">All Systems Online</span>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Lights:</span>
                  <span className="font-medium text-cyan-400">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monitored Zones:</span>
                  <span className="font-medium text-green-400">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Energy Savings:</span>
                  <span className="font-medium text-primary">73%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Incidents:</span>
                  <span className="font-medium text-red-400">2</span>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Info */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Info</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-3 py-2 space-y-2 text-xs">
              <div className="p-2 bg-muted rounded-md">
                <div className="font-medium text-primary">Peak Activity</div>
                <div className="text-muted-foreground">Downtown Core - 95% brightness</div>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <div className="font-medium text-amber-500">Recent Alert</div>
                <div className="text-muted-foreground">Motion detected - Sector 7</div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}