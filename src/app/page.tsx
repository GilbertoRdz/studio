
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("15");
  const [splitCount, setSplitCount] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountPerPerson, setAmountPerPerson] = useState(0);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage) / 100;
    const count = parseInt(splitCount);

    if (isNaN(bill) || isNaN(tip) || isNaN(count) || count <= 0) {
      alert("Please enter valid numbers and ensure the split count is greater than zero.");
      return;
    }

    const calculatedTip = bill * tip;
    const calculatedTotal = bill + calculatedTip;
    const calculatedPerPerson = calculatedTotal / count;

    setTipAmount(calculatedTip);
    setTotalAmount(calculatedTotal);
    setAmountPerPerson(calculatedPerPerson);
  };

  const handleTipPercentageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipPercentage(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md space-y-4 p-4">
        <CardHeader>
          <CardTitle className="text-center">TipSplitter</CardTitle>
          <CardDescription className="text-center">Calculate your tip and split the bill!</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="billAmount">Bill Amount</Label>
            <Input
              type="number"
              id="billAmount"
              placeholder="Enter bill amount"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tipPercentage">Tip Percentage</Label>
            <select
              id="tipPercentage"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={tipPercentage}
              onChange={handleTipPercentageChange}
            >
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
              <option value="25">25%</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="splitCount">Number of People</Label>
            <Input
              type="number"
              id="splitCount"
              placeholder="Enter number of people"
              value={splitCount}
              onChange={(e) => setSplitCount(e.target.value)}
            />
          </div>
          <Button onClick={calculateTip}>Calculate</Button>
        </CardContent>
      </Card>

      {totalAmount > 0 && (
        <Card className="w-full max-w-md space-y-4 p-4 mt-4">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Tip Amount</Label>
              <p>${tipAmount.toFixed(2)}</p>
            </div>
            <div className="grid gap-2">
              <Label>Total Amount (Bill + Tip)</Label>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
            <div className="grid gap-2">
              <Label>Amount Per Person</Label>
              <p>${amountPerPerson.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
