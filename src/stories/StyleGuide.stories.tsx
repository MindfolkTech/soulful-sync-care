import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';

const meta: Meta = {
  title: 'Style Guide 2.3/Components',
  parameters: {
    layout: 'centered',
    chromatic: {
      viewports: [375, 768, 1440],
      delay: 300
    }
  },
  tags: ['autodocs'],
};

export default meta;

// Test all button variants from Style Guide 2.3
export const ButtonVariants: StoryObj = {
  render: () => (
    <div className="space-y-6 p-8 bg-[var(--warm-white)] min-h-screen">
      <div className="space-y-4">
        <h2 className="font-primary text-xl text-[var(--text-primary)]">Button Variants</h2>
        
        {/* Primary buttons */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Primary Buttons</Label>
          <div className="space-x-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="primary" size="sm">Small Primary</Button>
            <Button variant="primary" size="lg">Large Primary</Button>
          </div>
        </div>

        {/* Secondary buttons */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Secondary Buttons</Label>
          <div className="space-x-4">
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="secondary" size="sm">Small Secondary</Button>
            <Button variant="secondary" size="lg">Large Secondary</Button>
          </div>
        </div>

        {/* Tertiary buttons */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Tertiary Buttons</Label>
          <div className="space-x-4">
            <Button variant="tertiary">Tertiary Button</Button>
            <Button variant="tertiary" size="sm">Small Tertiary</Button>
            <Button variant="tertiary" size="lg">Large Tertiary</Button>
          </div>
        </div>

        {/* Accent buttons */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Accent Buttons</Label>
          <div className="space-x-4">
            <Button variant="accent">Accent Button</Button>
            <Button variant="accent" size="sm">Small Accent</Button>
            <Button variant="accent" size="lg">Large Accent</Button>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">CTA Buttons</Label>
          <div className="space-x-4">
            <Button variant="cta">CTA Button</Button>
            <Button variant="cta" size="sm">Small CTA</Button>
            <Button variant="cta" size="lg">Large CTA</Button>
          </div>
        </div>

        {/* Disabled states */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Disabled States</Label>
          <div className="space-x-4">
            <Button variant="primary" disabled>Disabled Primary</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
            <Button variant="tertiary" disabled>Disabled Tertiary</Button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

// Test tag system with 5 categories from Style Guide 2.3
export const TagCategories: StoryObj = {
  render: () => (
    <div className="space-y-6 p-8 bg-[var(--warm-white)] min-h-screen">
      <div className="space-y-4">
        <h2 className="font-primary text-xl text-[var(--text-primary)]">Tag Categories</h2>
        
        {/* Personality tags */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Personality Tags</Label>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[var(--tag-personality-bg)] text-[var(--tag-personality-text)]">
              Empathetic
            </Badge>
            <Badge className="bg-[var(--tag-personality-bg)] text-[var(--tag-personality-text)]">
              Motivational
            </Badge>
            <Badge className="bg-[var(--tag-personality-bg)] text-[var(--tag-personality-text)]">
              Direct
            </Badge>
            <Badge className="bg-[var(--tag-personality-bg)] text-[var(--tag-personality-text)]">
              Patient
            </Badge>
          </div>
        </div>

        {/* Modality tags */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Modality Tags</Label>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[var(--tag-modality-bg)] text-[var(--tag-modality-text)]">
              CBT
            </Badge>
            <Badge className="bg-[var(--tag-modality-bg)] text-[var(--tag-modality-text)]">
              EMDR
            </Badge>
            <Badge className="bg-[var(--tag-modality-bg)] text-[var(--tag-modality-text)]">
              Psychodynamic
            </Badge>
            <Badge className="bg-[var(--tag-modality-bg)] text-[var(--tag-modality-text)]">
              Humanistic
            </Badge>
          </div>
        </div>

        {/* Specialty tags */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Specialty Tags</Label>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[var(--tag-specialty-bg)] text-[var(--tag-specialty-text)]">
              Anxiety
            </Badge>
            <Badge className="bg-[var(--tag-specialty-bg)] text-[var(--tag-specialty-text)]">
              Depression
            </Badge>
            <Badge className="bg-[var(--tag-specialty-bg)] text-[var(--tag-specialty-text)]">
              PTSD
            </Badge>
            <Badge className="bg-[var(--tag-specialty-bg)] text-[var(--tag-specialty-text)]">
              Relationships
            </Badge>
          </div>
        </div>

        {/* Language tags */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Language Tags</Label>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[var(--tag-language-bg)] text-[var(--tag-language-text)]">
              English
            </Badge>
            <Badge className="bg-[var(--tag-language-bg)] text-[var(--tag-language-text)]">
              Spanish
            </Badge>
            <Badge className="bg-[var(--tag-language-bg)] text-[var(--tag-language-text)]">
              French
            </Badge>
            <Badge className="bg-[var(--tag-language-bg)] text-[var(--tag-language-text)]">
              Mandarin
            </Badge>
          </div>
        </div>

        {/* Misc tags */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Misc Tags</Label>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[var(--tag-misc-bg)] text-[var(--tag-misc-text)]">
              LGBTQ+ Friendly
            </Badge>
            <Badge className="bg-[var(--tag-misc-bg)] text-[var(--tag-misc-text)]">
              Neurodiversity Affirming
            </Badge>
            <Badge className="bg-[var(--tag-misc-bg)] text-[var(--tag-misc-text)]">
              Cultural Sensitivity
            </Badge>
            <Badge className="bg-[var(--tag-misc-bg)] text-[var(--tag-misc-text)]">
              Trauma Informed
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

// Test form components
export const FormComponents: StoryObj = {
  render: () => (
    <div className="space-y-6 p-8 bg-[var(--warm-white)] min-h-screen">
      <div className="space-y-4">
        <h2 className="font-primary text-xl text-[var(--text-primary)]">Form Components</h2>
        
        {/* Input fields */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Input Fields</Label>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" />
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Textarea</Label>
          <div className="space-y-2 max-w-md">
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea 
              id="bio" 
              placeholder="Tell us about your therapeutic approach..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Checkboxes</Label>
          <div className="space-y-2 max-w-md">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">I agree to the terms and conditions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="newsletter" />
              <Label htmlFor="newsletter">Subscribe to newsletter</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="notifications" />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

// Test progress components
export const ProgressComponents: StoryObj = {
  render: () => (
    <div className="space-y-6 p-8 bg-[var(--warm-white)] min-h-screen">
      <div className="space-y-4">
        <h2 className="font-primary text-xl text-[var(--text-primary)]">Progress Components</h2>
        
        {/* Progress bars */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Progress Bars</Label>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-secondary text-[var(--text-secondary)]">Profile Complete</span>
                <span className="font-secondary text-[var(--garden-green)]">25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-secondary text-[var(--text-secondary)]">Profile Complete</span>
                <span className="font-secondary text-[var(--garden-green)]">50%</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-secondary text-[var(--text-secondary)]">Profile Complete</span>
                <span className="font-secondary text-[var(--garden-green)]">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-secondary text-[var(--text-secondary)]">Profile Complete</span>
                <span className="font-secondary text-[var(--garden-green)]">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

// Test card components
export const CardComponents: StoryObj = {
  render: () => (
    <div className="space-y-6 p-8 bg-[var(--warm-white)] min-h-screen">
      <div className="space-y-4">
        <h2 className="font-primary text-xl text-[var(--text-primary)]">Card Components</h2>
        
        {/* Basic cards */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Basic Cards</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="font-primary text-lg text-[var(--text-primary)]">
                  Welcome Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-secondary text-[var(--text-secondary)]">
                  This is a basic card component with header and content.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="font-primary text-lg text-[var(--text-primary)]">
                  Information Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-secondary text-[var(--text-secondary)]">
                  Another card example with different content.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Status cards */}
        <div className="space-y-2">
          <Label className="font-secondary text-[var(--text-secondary)]">Status Cards</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            <Card className="border-[var(--success-bg)] bg-[var(--success-bg)]/5">
              <CardHeader>
                <CardTitle className="font-primary text-lg text-[var(--success-text)]">
                  Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-secondary text-[var(--success-text)]">
                  Operation completed successfully.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-[var(--warning-bg)] bg-[var(--warning-bg)]/5">
              <CardHeader>
                <CardTitle className="font-primary text-lg text-[var(--warning-text)]">
                  Warning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-secondary text-[var(--warning-text)]">
                  Please review your information.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-[var(--error-bg)] bg-[var(--error-bg)]/5">
              <CardHeader>
                <CardTitle className="font-primary text-lg text-[var(--error-text)]">
                  Error
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-secondary text-[var(--error-text)]">
                  Something went wrong.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};
