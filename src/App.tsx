import { useState } from "react";
import Quotation from "./components/quotation";
import Invoice from "./components/invoice";
import { Button } from "./components/ui/button";

function App() {
    const [activeTab, setActiveTab] = useState<"quotation" | "invoice">("quotation");

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-4">
            <div className="flex gap-4">
                <Button
                    variant={activeTab === "quotation" ? "default" : "outline"}
                    onClick={() => setActiveTab("quotation")}
                >
                    Quotation
                </Button>
                <Button
                    variant={activeTab === "invoice" ? "default" : "outline"}
                    onClick={() => setActiveTab("invoice")}
                >
                    Invoice
                </Button>
            </div>
            {activeTab === "quotation" ? <Quotation /> : <Invoice />}
        </div>
    );
}

export default App;
