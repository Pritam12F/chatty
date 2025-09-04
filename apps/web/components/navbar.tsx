"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
} from "@workspace/ui/components/navbar-menu";
import { cn } from "@workspace/ui/lib/utils";
import { Github, Home, KeyRound, LogIn, Twitter } from "lucide-react";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">
              <div className="flex items-center space-x-1.5">
                <Home className="w-5 h-5" />
                <div>Home</div>
              </div>
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Contact Us">
          <div className="flex flex-col text-sm p-0.5 space-y-4">
            <HoveredLink href="https://github.com/Pritam12F">
              <div className="flex items-center space-x-1.5">
                <Github className="w-5 h-5" />
                <div>GitHub</div>
              </div>
            </HoveredLink>
            <HoveredLink href="https://x.com/pritam121f">
              <div className="flex items-center space-x-1.5">
                <Twitter className="w-5 h-5" />
                <div>X</div>
              </div>
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Log In">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/signin">
              <div className="flex items-center space-x-1.5">
                <LogIn className="w-5 h-5" />
                <div>Sign In</div>
              </div>
            </HoveredLink>
            <HoveredLink href="/signup">
              <div className="flex items-center space-x-1.5">
                <KeyRound className="w-5 h-5" />
                <div>Sign Up</div>
              </div>
            </HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
