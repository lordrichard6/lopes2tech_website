"use client";

import { Component, type ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    override componentDidCatch(error: Error, info: { componentStack: string }) {
        console.error("Section render error:", error, info.componentStack);
    }

    override render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div className="py-12 text-center text-slate-500 text-sm">
                        This section failed to load.
                    </div>
                )
            );
        }
        return this.props.children;
    }
}
