import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Lock, 
  Check, 
  X,
  AlertCircle
} from "lucide-react";

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account';
  last4: string;
  brand?: string;
}

interface PaymentFormProps {
  onClose?: () => void;
  onSuccess?: (paymentMethod: PaymentMethod) => void;
  showPlanSelection?: boolean;
}

export function PaymentForm({ 
  onClose, 
  onSuccess, 
  showPlanSelection = false 
}: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 99,
      sessions: 2,
      features: ["2 sessions per month", "Secure messaging", "Basic resources"]
    },
    {
      id: "premium", 
      name: "Premium Plan",
      price: 149,
      sessions: 4,
      features: ["4 sessions per month", "Secure messaging", "Priority booking", "Homework assignments", "Progress tracking"],
      popular: true
    },
    {
      id: "unlimited",
      name: "Unlimited Plan", 
      price: 249,
      sessions: "Unlimited",
      features: ["Unlimited sessions", "24/7 messaging", "Crisis support", "Family sessions", "Personalized resources"]
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cardNumber.replace(/\s/g, '') || formData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = "Please enter a valid card number";
    }
    if (!formData.expiryMonth || !formData.expiryYear) {
      newErrors.expiry = "Please enter expiry date";
    }
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Please enter valid CVV";
    }
    if (!formData.name) {
      newErrors.name = "Cardholder name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, integrate with Stripe here
      console.log("Processing payment:", { formData, selectedPlan });
      
      onSuccess?.({
        id: `pm_${Math.random().toString(36).substr(2, 9)}`,
        last4: formData.cardNumber.slice(-4),
        brand: "visa",
        expiry: `${formData.expiryMonth}/${formData.expiryYear}`
      });
      
      onClose?.();
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Plan Selection */}
      {showPlanSelection && (
        <div className="space-y-4">
          <h3 className="font-primary font-semibold text-lg text-[hsl(var(--text-primary))] dark:text-[hsl(var(--on-dark))] mb-4">Choose Your Plan</h3>
          <div className="grid gap-3">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`cursor-pointer transition-all ${
                  selectedPlan === plan.id 
                    ? "ring-2 ring-primary bg-primary/5" 
                    : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-secondary font-medium text-[hsl(var(--text-primary))] dark:text-[hsl(var(--on-dark))]">{plan.name}</h4>
                      {plan.popular && (
                        <Badge variant="default" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">${plan.price}</div>
                      <div className="text-xs text-muted-foreground">per month</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {plan.sessions} sessions per month
                  </p>
                  <ul className="text-xs space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <Check className="h-3 w-3 text-[hsl(var(--success-text))]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <Separator />
        </div>
      )}

      {/* Payment Information */}
      <div className="bg-[hsl(var(--surface))] dark:bg-[hsl(var(--ink-slate))] rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="font-primary font-semibold text-lg text-[hsl(var(--text-primary))] dark:text-[hsl(var(--on-dark))] mb-4">Payment Information</h3>

        {/* Card Number */}
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
            maxLength={19}
            className={errors.cardNumber ? "border-red-500" : ""}
          />
          {errors.cardNumber && (
            <p className="text-xs text-error-foreground mt-1 flex items-center gap-1 font-secondary">
              <AlertCircle className="h-3 w-3" />
              {errors.cardNumber}
            </p>
          )}
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="expiryMonth">Month</Label>
            <Input
              id="expiryMonth"
              placeholder="MM"
              value={formData.expiryMonth}
              onChange={(e) => handleInputChange("expiryMonth", e.target.value.replace(/\D/g, '').slice(0, 2))}
              maxLength={2}
              className={errors.expiry ? "border-red-500" : ""}
            />
          </div>
          <div>
            <Label htmlFor="expiryYear">Year</Label>
            <Input
              id="expiryYear" 
              placeholder="YY"
              value={formData.expiryYear}
              onChange={(e) => handleInputChange("expiryYear", e.target.value.replace(/\D/g, '').slice(0, 2))}
              maxLength={2}
              className={errors.expiry ? "border-red-500" : ""}
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              placeholder="123"
              value={formData.cvv}
              onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
              className={errors.cvv ? "border-red-500" : ""}
            />
          </div>
        </div>
        {errors.expiry && (
          <p className="text-xs text-[hsl(var(--error-text))] flex items-center gap-1 font-secondary">
            <AlertCircle className="h-3 w-3" />
            {errors.expiry}
          </p>
        )}

        {/* Cardholder Name */}
        <div>
          <Label htmlFor="name">Cardholder Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-xs text-error-foreground mt-1 flex items-center gap-1 font-secondary">
              <AlertCircle className="h-3 w-3" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-xs text-error-foreground mt-1 flex items-center gap-1 font-secondary">
              <AlertCircle className="h-3 w-3" />
              {errors.email}
            </p>
          )}
        </div>
      </div>
      </div>

      {/* Security Notice */}
      <div className="p-3 bg-surface-accent border border-border rounded-lg">
        <div className="flex items-center space-x-2 mt-4">
          <Lock className="h-4 w-4 text-text-secondary" />
          <span className="text-sm font-medium text-text-primary font-secondary">
            Secure Payment
          </span>
        </div>
        <p className="text-xs text-text-secondary mt-1 font-secondary">
          Your payment information is encrypted and secure. We use industry-standard SSL encryption.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={processing} className="flex-1">
          {processing ? (
            "Processing..."
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              {showPlanSelection ? `Subscribe - $${plans.find(p => p.id === selectedPlan)?.price}/mo` : "Add Payment Method"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
