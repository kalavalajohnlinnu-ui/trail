const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so your GitHub Pages site can communicate with this Render backend
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check Endpoint (Render uses this to verify server status)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'EffiSol Proposal Engine',
    message: 'Backend server is running securely on Render!' 
  });
});

// SECRET BACKEND CALCULATION ENGINE
// This code runs strictly on Render.com and CANNOT be viewed or copied by Chrome users!
app.post('/api/calculate-proposal', (req, res) => {
  try {
    const { 
      customerName = 'Customer', 
      systemSizeKw = 5.5, 
      pricePerWatt = 55, 
      batteryCapacity = 0,
      panelType = 'Mono PERC 540W',
      inverterType = '5kW Hybrid Inverter',
      discount = 0
    } = req.body;

    // Secret Pricing & Financial Formulas
    const baseCost = Number(systemSizeKw) * 1000 * Number(pricePerWatt);
    const batteryCost = Number(batteryCapacity) * 12000;
    const grossTotal = baseCost + batteryCost;
    const discountAmount = (grossTotal * Number(discount)) / 100;
    const netTotal = grossTotal - discountAmount;

    // Subsidy Calculation (Govt Solar Subsidy Scheme)
    let subsidy = 0;
    if (systemSizeKw <= 3) {
      subsidy = systemSizeKw * 18000;
    } else {
      subsidy = (3 * 18000) + ((systemSizeKw - 3) * 9000);
      if (subsidy > 78000) subsidy = 78000;
    }

    const finalCustomerPayable = netTotal - subsidy;
    const estimatedAnnualGeneration = Math.round(systemSizeKw * 1450); // kWh/year
    const annualSavings = Math.round(estimatedAnnualGeneration * 8.5); // INR/year
    const paybackPeriodYears = (finalCustomerPayable / annualSavings).toFixed(1);

    // Return calculated financial & technical payload to frontend
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      proposalData: {
        customerName,
        systemSizeKw: Number(systemSizeKw),
        panelType,
        inverterType,
        financials: {
          grossTotal: Math.round(grossTotal),
          discountAmount: Math.round(discountAmount),
          netTotal: Math.round(netTotal),
          subsidyAmount: Math.round(subsidy),
          finalPayable: Math.round(finalCustomerPayable),
          estimatedAnnualGenKwh: estimatedAnnualGeneration,
          estimatedAnnualSavingsInr: annualSavings,
          paybackYears: Number(paybackPeriodYears)
        }
      }
    });
  } catch (error) {
    console.error('Calculation Error:', error);
    res.status(500).json({ success: false, message: 'Server calculation error' });
  }
});

app.listen(PORT, () => {
  console.log(`EffiSol Backend Server running on port ${PORT}`);
});
