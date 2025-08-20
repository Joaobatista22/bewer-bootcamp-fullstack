"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Endereços de Entrega</CardTitle>
      </CardHeader>
      <CardContent>
        <CardContent>
          <RadioGroup
            value={selectedAddress}
            onValueChange={setSelectedAddress}
          >
            <Card>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add_new" id="add_new" />
                  <Label htmlFor="add_new">Adicionar Novo Endereço</Label>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>
          {selectedAddress === "add_new" && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">Adicionar Novo Endereço</h3>
              {/* Formulário para adicionar novo endereço */}
            </div>
          )}
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default Addresses;