import { Page } from 'playwright';

export interface StyleGuideAnalysis {
  compliance: {
    score: number;
    issues: string[];
  };
  colorUsage: {
    primary: boolean;
    secondary: boolean;
    accent: boolean;
    neutral: boolean;
    issues: string[];
  };
  typography: {
    fontFamilies: string[];
    fontSizeHierarchy: boolean;
    lineHeightConsistency: boolean;
    issues: string[];
  };
  spacing: {
    consistent: boolean;
    rhythm: boolean;
    padding: boolean;
    margin: boolean;
    issues: string[];
  };
  components: {
    buttonStyles: string[];
    cardStyles: string[];
    formElements: string[];
    issues: string[];
  };
}

export interface UIBestPracticesAnalysis {
  visualHierarchy: {
    score: number;
    headingStructure: boolean;
    contentGrouping: boolean;
    emphasis: boolean;
    issues: string[];
  };
  spacing: {
    score: number;
    whiteSpace: boolean;
    padding: boolean;
    margins: boolean;
    issues: string[];
  };
  colorScheme: {
    score: number;
    contrast: boolean;
    consistency: boolean;
    accessibility: boolean;
    issues: string[];
  };
  typography: {
    score: number;
    readability: boolean;
    hierarchy: boolean;
    consistency: boolean;
    issues: string[];
  };
  layout: {
    score: number;
    grid: boolean;
    alignment: boolean;
    balance: boolean;
    issues: string[];
  };
}

export interface UXBestPracticesAnalysis {
  informationArchitecture: {
    score: number;
    navigation: boolean;
    contentOrganization: boolean;
    userFlow: boolean;
    issues: string[];
  };
  usability: {
    score: number;
    taskCompletion: boolean;
    errorPrevention: boolean;
    feedback: boolean;
    issues: string[];
  };
  accessibility: {
    score: number;
    keyboardNavigation: boolean;
    screenReader: boolean;
    colorContrast: boolean;
    issues: string[];
  };
  mobileExperience: {
    score: number;
    responsive: boolean;
    touchTargets: boolean;
    performance: boolean;
    issues: string[];
  };
}

export interface LayoutPatternAnalysis {
  detectedPatterns: string[];
  layoutType: 'single-column' | 'multi-column' | 'grid' | 'card-based' | 'dashboard' | 'unknown';
  complexity: 'simple' | 'moderate' | 'complex';
  modernTrends: {
    glassmorphism: boolean;
    neumorphism: boolean;
    minimalism: boolean;
    brutalism: boolean;
    issues: string[];
  };
  recommendations: string[];
}

export interface CompetitorAnalysis {
  visualAppeal: {
    score: number;
    modernDesign: boolean;
    professionalLook: boolean;
    brandConsistency: boolean;
    issues: string[];
  };
  userExperience: {
    score: number;
    intuitiveNavigation: boolean;
    clearCallToActions: boolean;
    informationDensity: boolean;
    issues: string[];
  };
  differentiation: {
    score: number;
    uniqueElements: string[];
    competitiveAdvantages: string[];
    improvementOpportunities: string[];
  };
}

export class AestheticAnalyzer {
  private styleGuideRules = {
    colors: {
      primary: ['#10b981', '#059669', '#047857'], // Garden green variants
      secondary: ['#f59e0b', '#d97706', '#b45309'], // Jovial jade variants
      accent: ['#8b5cf6', '#7c3aed', '#6d28d9'], // Elated emerald variants
      neutral: ['#fefefe', '#f8fafc', '#e2e8f0', '#64748b', '#1e293b']
    },
    typography: {
      primary: 'Crimson Text',
      secondary: 'Helvetica Neue',
      sizes: [12, 14, 16, 18, 20, 24, 32, 40, 48],
      lineHeights: [1.2, 1.4, 1.6, 1.8]
    },
    spacing: {
      scale: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
      rhythm: true
    },
    components: {
      borderRadius: [4, 8, 12, 16],
      shadows: ['sm', 'md', 'lg', 'xl'],
      buttonStyles: ['primary', 'secondary', 'outline', 'ghost']
    }
  };

  private uiBestPractices = {
    visualHierarchy: {
      headingLevels: [1, 2, 3, 4, 5, 6],
      contentGrouping: true,
      emphasis: true
    },
    spacing: {
      whiteSpaceRatio: 0.3, // 30% white space
      paddingConsistency: true,
      marginConsistency: true
    },
    colorScheme: {
      maxColors: 5,
      contrastRatio: 4.5,
      consistency: true
    },
    typography: {
      maxFontFamilies: 2,
      sizeHierarchy: true,
      readability: true
    },
    layout: {
      gridSystem: true,
      alignment: true,
      balance: true
    }
  };

  private uxBestPractices = {
    informationArchitecture: {
      navigationClarity: true,
      contentOrganization: true,
      userFlow: true
    },
    usability: {
      taskCompletion: true,
      errorPrevention: true,
      feedback: true
    },
    accessibility: {
      keyboardNavigation: true,
      screenReader: true,
      colorContrast: true
    },
    mobileExperience: {
      responsive: true,
      touchTargets: true,
      performance: true
    }
  };

  private popularLayouts = {
    patterns: [
      'hero-section',
      'feature-grid',
      'testimonial-carousel',
      'pricing-table',
      'dashboard-layout',
      'card-grid',
      'sidebar-navigation',
      'tabbed-content',
      'modal-overlay',
      'breadcrumb-navigation'
    ],
    modernTrends: {
      glassmorphism: ['backdrop-blur', 'semi-transparent', 'glass-effect'],
      neumorphism: ['soft-shadows', 'embossed', 'inset-shadows'],
      minimalism: ['clean-lines', 'white-space', 'simple-forms'],
      brutalism: ['bold-typography', 'high-contrast', 'geometric-shapes']
    }
  };

  async analyzeStyleGuideCompliance(page: Page): Promise<StyleGuideAnalysis> {
    const analysis = await page.evaluate(() => {
      const issues: string[] = [];
      let score = 100;

      // Analyze color usage
      const colorUsage = {
        primary: false,
        secondary: false,
        accent: false,
        neutral: false,
        issues: [] as string[]
      };

      // Check for brand colors in CSS
      const styles = getComputedStyle(document.body);
      const cssText = Array.from(document.styleSheets)
        .map(sheet => {
          try {
            return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
          } catch (e) {
            return '';
          }
        }).join('\n');

      // Check for garden green usage
      if (!cssText.includes('#10b981') && !cssText.includes('garden-green')) {
        colorUsage.issues.push('Primary brand color (garden green) not used');
        score -= 10;
      } else {
        colorUsage.primary = true;
      }

      // Check for jovial jade usage
      if (!cssText.includes('#f59e0b') && !cssText.includes('jovial-jade')) {
        colorUsage.issues.push('Secondary brand color (jovial jade) not used');
        score -= 5;
      } else {
        colorUsage.secondary = true;
      }

      // Analyze typography
      const typography = {
        fontFamilies: [] as string[],
        fontSizeHierarchy: false,
        lineHeightConsistency: false,
        issues: [] as string[]
      };

      // Check font families
      const elements = document.querySelectorAll('*');
      const fontFamilies = new Set<string>();
      const fontSizes = new Set<number>();

      elements.forEach(el => {
        const styles = getComputedStyle(el);
        if (styles.fontFamily) {
          fontFamilies.add(styles.fontFamily);
        }
        if (styles.fontSize) {
          fontSizes.add(parseFloat(styles.fontSize));
        }
      });

      typography.fontFamilies = Array.from(fontFamilies);

      // Check for Crimson Text usage
      if (!Array.from(fontFamilies).some(font => font.includes('Crimson'))) {
        typography.issues.push('Primary font (Crimson Text) not used');
        score -= 10;
      }

      // Check font size hierarchy
      if (fontSizes.size >= 3) {
        typography.fontSizeHierarchy = true;
      } else {
        typography.issues.push('Insufficient font size hierarchy');
        score -= 5;
      }

      // Analyze spacing
      const spacing = {
        consistent: false,
        rhythm: false,
        padding: false,
        margin: false,
        issues: [] as string[]
      };

      // Check for consistent spacing values
      const spacingValues = new Set<number>();
      elements.forEach(el => {
        const styles = getComputedStyle(el);
        ['padding', 'margin'].forEach(prop => {
          const value = styles.getPropertyValue(prop);
          if (value && value !== '0px') {
            const numValue = parseFloat(value);
            if (!isNaN(numValue)) {
              spacingValues.add(numValue);
            }
          }
        });
      });

      // Check if spacing follows 8px grid
      const validSpacing = Array.from(spacingValues).filter(val => val % 8 === 0);
      if (validSpacing.length / spacingValues.size > 0.7) {
        spacing.rhythm = true;
      } else {
        spacing.issues.push('Spacing not following 8px grid system');
        score -= 5;
      }

      // Analyze components
      const components = {
        buttonStyles: [] as string[],
        cardStyles: [] as string[],
        formElements: [] as string[],
        issues: [] as string[]
      };

      // Check button styles
      const buttons = document.querySelectorAll('button');
      buttons.forEach(btn => {
        const styles = getComputedStyle(btn);
        const className = btn.className;
        if (className.includes('primary')) components.buttonStyles.push('primary');
        if (className.includes('secondary')) components.buttonStyles.push('secondary');
        if (className.includes('outline')) components.buttonStyles.push('outline');
        if (className.includes('ghost')) components.buttonStyles.push('ghost');
      });

      if (components.buttonStyles.length === 0) {
        components.issues.push('No button style variants found');
        score -= 5;
      }

      return {
        compliance: { score: Math.max(0, score), issues },
        colorUsage,
        typography,
        spacing,
        components
      };
    });

    return analysis;
  }

  async analyzeUIBestPractices(page: Page): Promise<UIBestPracticesAnalysis> {
    const analysis = await page.evaluate(() => {
      const issues: string[] = [];
      let overallScore = 100;

      // Visual Hierarchy Analysis
      const visualHierarchy = {
        score: 100,
        headingStructure: false,
        contentGrouping: false,
        emphasis: false,
        issues: [] as string[]
      };

      // Check heading structure
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.substring(1)));
      
      if (headingLevels.length > 0) {
        visualHierarchy.headingStructure = true;
        // Check for proper hierarchy
        let currentLevel = 0;
        for (const level of headingLevels) {
          if (level > currentLevel + 1) {
            visualHierarchy.issues.push(`Heading level ${level} skipped from ${currentLevel}`);
            visualHierarchy.score -= 5;
          }
          currentLevel = level;
        }
      } else {
        visualHierarchy.issues.push('No heading structure found');
        visualHierarchy.score -= 20;
      }

      // Check content grouping
      const sections = document.querySelectorAll('section, article, div[class*="card"], div[class*="container"]');
      if (sections.length > 0) {
        visualHierarchy.contentGrouping = true;
      } else {
        visualHierarchy.issues.push('Poor content grouping');
        visualHierarchy.score -= 10;
      }

      // Check emphasis (bold, italic, color)
      const emphasisElements = document.querySelectorAll('strong, b, em, i, [style*="font-weight"], [style*="color"]');
      if (emphasisElements.length > 0) {
        visualHierarchy.emphasis = true;
      }

      // Spacing Analysis
      const spacing = {
        score: 100,
        whiteSpace: false,
        padding: false,
        margins: false,
        issues: [] as string[]
      };

      // Calculate white space ratio
      const bodyRect = document.body.getBoundingClientRect();
      const contentElements = document.querySelectorAll('*:not(script, style, meta, link)');
      let contentArea = 0;
      
      contentElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          contentArea += rect.width * rect.height;
        }
      });

      const whiteSpaceRatio = 1 - (contentArea / (bodyRect.width * bodyRect.height));
      if (whiteSpaceRatio > 0.2) {
        spacing.whiteSpace = true;
      } else {
        spacing.issues.push('Insufficient white space');
        spacing.score -= 15;
      }

      // Color Scheme Analysis
      const colorScheme = {
        score: 100,
        contrast: false,
        consistency: false,
        accessibility: false,
        issues: [] as string[]
      };

      // Check color consistency
      const colors = new Set<string>();
      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        const styles = getComputedStyle(el);
        const color = styles.color;
        const backgroundColor = styles.backgroundColor;
        if (color && color !== 'rgba(0, 0, 0, 0)') colors.add(color);
        if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(backgroundColor);
      });

      if (colors.size <= 5) {
        colorScheme.consistency = true;
      } else {
        colorScheme.issues.push('Too many colors used');
        colorScheme.score -= 10;
      }

      // Typography Analysis
      const typography = {
        score: 100,
        readability: false,
        hierarchy: false,
        consistency: false,
        issues: [] as string[]
      };

      // Check font consistency
      const fontFamilies = new Set<string>();
      elements.forEach(el => {
        const styles = getComputedStyle(el);
        if (styles.fontFamily) {
          fontFamilies.add(styles.fontFamily);
        }
      });

      if (fontFamilies.size <= 2) {
        typography.consistency = true;
      } else {
        typography.issues.push('Too many font families');
        typography.score -= 10;
      }

      // Layout Analysis
      const layout = {
        score: 100,
        grid: false,
        alignment: false,
        balance: false,
        issues: [] as string[]
      };

      // Check for grid system
      const gridElements = document.querySelectorAll('[class*="grid"], [class*="flex"], [style*="display: grid"], [style*="display: flex"]');
      if (gridElements.length > 0) {
        layout.grid = true;
      } else {
        layout.issues.push('No grid system detected');
        layout.score -= 15;
      }

      return {
        visualHierarchy,
        spacing,
        colorScheme,
        typography,
        layout
      };
    });

    return analysis;
  }

  async analyzeUXBestPractices(page: Page): Promise<UXBestPracticesAnalysis> {
    const analysis = await page.evaluate(() => {
      // Information Architecture Analysis
      const informationArchitecture = {
        score: 100,
        navigation: false,
        contentOrganization: false,
        userFlow: false,
        issues: [] as string[]
      };

      // Check navigation
      const navElements = document.querySelectorAll('nav, [role="navigation"], [class*="nav"], [class*="menu"]');
      if (navElements.length > 0) {
        informationArchitecture.navigation = true;
      } else {
        informationArchitecture.issues.push('No navigation found');
        informationArchitecture.score -= 20;
      }

      // Check content organization
      const organizedContent = document.querySelectorAll('section, article, main, aside, header, footer');
      if (organizedContent.length > 0) {
        informationArchitecture.contentOrganization = true;
      } else {
        informationArchitecture.issues.push('Poor content organization');
        informationArchitecture.score -= 15;
      }

      // Usability Analysis
      const usability = {
        score: 100,
        taskCompletion: false,
        errorPrevention: false,
        feedback: false,
        issues: [] as string[]
      };

      // Check for clear call-to-actions
      const ctas = document.querySelectorAll('button, [role="button"], a[href], input[type="submit"]');
      if (ctas.length > 0) {
        usability.taskCompletion = true;
      } else {
        usability.issues.push('No clear call-to-actions');
        usability.score -= 20;
      }

      // Check for form validation
      const forms = document.querySelectorAll('form');
      const hasValidation = Array.from(forms).some(form => 
        form.querySelector('input[required], select[required], textarea[required]') ||
        form.querySelector('[aria-invalid], .error, .invalid')
      );
      if (hasValidation) {
        usability.errorPrevention = true;
      }

      // Accessibility Analysis
      const accessibility = {
        score: 100,
        keyboardNavigation: false,
        screenReader: false,
        colorContrast: false,
        issues: [] as string[]
      };

      // Check for keyboard navigation
      const focusableElements = document.querySelectorAll('button, input, select, textarea, a[href], [tabindex]');
      if (focusableElements.length > 0) {
        accessibility.keyboardNavigation = true;
      } else {
        accessibility.issues.push('No keyboard navigation elements');
        accessibility.score -= 15;
      }

      // Check for screen reader support
      const ariaElements = document.querySelectorAll('[aria-label], [aria-labelledby], [role], [alt]');
      if (ariaElements.length > 0) {
        accessibility.screenReader = true;
      } else {
        accessibility.issues.push('Limited screen reader support');
        accessibility.score -= 10;
      }

      // Mobile Experience Analysis
      const mobileExperience = {
        score: 100,
        responsive: false,
        touchTargets: false,
        performance: false,
        issues: [] as string[]
      };

      // Check for responsive design
      const responsiveElements = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"], [style*="@media"]');
      if (responsiveElements.length > 0) {
        mobileExperience.responsive = true;
      } else {
        mobileExperience.issues.push('No responsive design detected');
        mobileExperience.score -= 20;
      }

      // Check touch target sizes
      const touchElements = document.querySelectorAll('button, a, input, select, textarea');
      const smallTouchTargets = Array.from(touchElements).filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width < 44 || rect.height < 44;
      });

      if (smallTouchTargets.length === 0) {
        mobileExperience.touchTargets = true;
      } else {
        mobileExperience.issues.push(`${smallTouchTargets.length} touch targets too small`);
        mobileExperience.score -= 10;
      }

      return {
        informationArchitecture,
        usability,
        accessibility,
        mobileExperience
      };
    });

    return analysis;
  }

  async analyzeLayoutPatterns(page: Page): Promise<LayoutPatternAnalysis> {
    const analysis = await page.evaluate(() => {
      const detectedPatterns: string[] = [];
      let layoutType: 'single-column' | 'multi-column' | 'grid' | 'card-based' | 'dashboard' | 'unknown' = 'unknown';
      let complexity: 'simple' | 'moderate' | 'complex' = 'simple';

      // Detect layout patterns
      const body = document.body;
      const mainContent = document.querySelector('main') || body;

      // Check for hero section
      const heroSection = document.querySelector('[class*="hero"], [class*="banner"], h1 + p, h1 + div');
      if (heroSection) {
        detectedPatterns.push('hero-section');
      }

      // Check for grid layout
      const gridElements = document.querySelectorAll('[class*="grid"], [style*="display: grid"]');
      if (gridElements.length > 0) {
        detectedPatterns.push('grid-layout');
        layoutType = 'grid';
      }

      // Check for card-based layout
      const cards = document.querySelectorAll('[class*="card"], .card, [class*="tile"]');
      if (cards.length > 0) {
        detectedPatterns.push('card-based');
        layoutType = 'card-based';
      }

      // Check for sidebar navigation
      const sidebar = document.querySelector('[class*="sidebar"], [class*="nav"], aside');
      if (sidebar) {
        detectedPatterns.push('sidebar-navigation');
        layoutType = 'dashboard';
      }

      // Check for tabs
      const tabs = document.querySelectorAll('[role="tab"], [class*="tab"]');
      if (tabs.length > 0) {
        detectedPatterns.push('tabbed-content');
      }

      // Check for modal
      const modal = document.querySelector('[role="dialog"], [class*="modal"], [class*="overlay"]');
      if (modal) {
        detectedPatterns.push('modal-overlay');
      }

      // Determine complexity
      const elementCount = document.querySelectorAll('*').length;
      if (elementCount > 100) {
        complexity = 'complex';
      } else if (elementCount > 50) {
        complexity = 'moderate';
      }

      // Detect modern trends
      const modernTrends = {
        glassmorphism: false,
        neumorphism: false,
        minimalism: false,
        brutalism: false,
        issues: [] as string[]
      };

      // Check for glassmorphism
      const glassElements = document.querySelectorAll('[class*="backdrop-blur"], [class*="glass"], [style*="backdrop-filter"]');
      if (glassElements.length > 0) {
        modernTrends.glassmorphism = true;
      }

      // Check for minimalism
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
      const imageElements = document.querySelectorAll('img, svg');
      if (textElements.length > imageElements.length * 2) {
        modernTrends.minimalism = true;
      }

      // Generate recommendations
      const recommendations: string[] = [];
      
      if (!detectedPatterns.includes('hero-section')) {
        recommendations.push('Consider adding a hero section for better first impression');
      }
      
      if (layoutType === 'unknown') {
        recommendations.push('Implement a clear layout pattern (grid, flexbox, or card-based)');
      }
      
      if (complexity === 'simple' && detectedPatterns.length < 3) {
        recommendations.push('Add more visual interest with additional layout patterns');
      }

      return {
        detectedPatterns,
        layoutType,
        complexity,
        modernTrends,
        recommendations
      };
    });

    return analysis;
  }

  async analyzeCompetitorComparison(page: Page, route: string): Promise<CompetitorAnalysis> {
    // This would typically compare against known competitor screenshots
    // For now, we'll provide a framework for comparison
    const analysis = await page.evaluate(() => {
      const visualAppeal = {
        score: 85, // Default score, would be compared against competitors
        modernDesign: false,
        professionalLook: false,
        brandConsistency: false,
        issues: [] as string[]
      };

      // Check for modern design elements
      const modernElements = document.querySelectorAll('[class*="gradient"], [class*="shadow"], [class*="rounded"], [class*="blur"]');
      if (modernElements.length > 0) {
        visualAppeal.modernDesign = true;
        visualAppeal.score += 10;
      } else {
        visualAppeal.issues.push('Limited modern design elements');
      }

      // Check for professional look
      const professionalElements = document.querySelectorAll('h1, h2, h3, button, [class*="card"]');
      if (professionalElements.length >= 5) {
        visualAppeal.professionalLook = true;
        visualAppeal.score += 10;
      }

      const userExperience = {
        score: 80,
        intuitiveNavigation: false,
        clearCallToActions: false,
        informationDensity: false,
        issues: [] as string[]
      };

      // Check navigation clarity
      const navElements = document.querySelectorAll('nav, [role="navigation"]');
      if (navElements.length > 0) {
        userExperience.intuitiveNavigation = true;
        userExperience.score += 15;
      }

      // Check call-to-actions
      const ctas = document.querySelectorAll('button, [role="button"], a[href]');
      if (ctas.length >= 3) {
        userExperience.clearCallToActions = true;
        userExperience.score += 10;
      }

      const differentiation = {
        score: 75,
        uniqueElements: [] as string[],
        competitiveAdvantages: [] as string[],
        improvementOpportunities: [] as string[]
      };

      // Identify unique elements
      const uniqueElements = document.querySelectorAll('[class*="custom"], [class*="unique"], [data-testid]');
      differentiation.uniqueElements = Array.from(uniqueElements).map(el => el.tagName.toLowerCase());

      // Generate competitive advantages
      if (visualAppeal.modernDesign) {
        differentiation.competitiveAdvantages.push('Modern visual design');
      }
      if (userExperience.intuitiveNavigation) {
        differentiation.competitiveAdvantages.push('Intuitive user experience');
      }

      // Generate improvement opportunities
      if (!visualAppeal.modernDesign) {
        differentiation.improvementOpportunities.push('Add modern design elements');
      }
      if (!userExperience.clearCallToActions) {
        differentiation.improvementOpportunities.push('Improve call-to-action clarity');
      }

      return {
        visualAppeal,
        userExperience,
        differentiation
      };
    });

    return analysis;
  }

  async generateAestheticReport(
    styleGuide: StyleGuideAnalysis,
    uiBestPractices: UIBestPracticesAnalysis,
    uxBestPractices: UXBestPracticesAnalysis,
    layoutPatterns: LayoutPatternAnalysis,
    competitorAnalysis: CompetitorAnalysis
  ): Promise<string> {
    const report = [];
    
    report.push('# 🎨 Aesthetic Analysis Report');
    report.push(`Generated: ${new Date().toISOString()}`);
    report.push('');

    // Overall Aesthetic Score
    const overallScore = (
      styleGuide.compliance.score +
      (uiBestPractices.visualHierarchy.score + uiBestPractices.spacing.score + uiBestPractices.colorScheme.score + uiBestPractices.typography.score + uiBestPractices.layout.score) / 5 +
      (uxBestPractices.informationArchitecture.score + uxBestPractices.usability.score + uxBestPractices.accessibility.score + uxBestPractices.mobileExperience.score) / 4 +
      competitorAnalysis.visualAppeal.score
    ) / 4;

    report.push('## 📊 Overall Aesthetic Score');
    report.push(`**${overallScore.toFixed(1)}/100**`);
    report.push('');

    // Style Guide Compliance
    report.push('## 🎯 Style Guide 2.3 Compliance');
    report.push(`**Score: ${styleGuide.compliance.score}/100**`);
    report.push('');
    
    if (styleGuide.compliance.issues.length > 0) {
      report.push('### Issues:');
      styleGuide.compliance.issues.forEach(issue => {
        report.push(`- ${issue}`);
      });
      report.push('');
    }

    // UI Best Practices
    report.push('## 🎨 UI Best Practices Analysis');
    report.push(`- **Visual Hierarchy**: ${uiBestPractices.visualHierarchy.score}/100`);
    report.push(`- **Spacing**: ${uiBestPractices.spacing.score}/100`);
    report.push(`- **Color Scheme**: ${uiBestPractices.colorScheme.score}/100`);
    report.push(`- **Typography**: ${uiBestPractices.typography.score}/100`);
    report.push(`- **Layout**: ${uiBestPractices.layout.score}/100`);
    report.push('');

    // UX Best Practices
    report.push('## 🚀 UX Best Practices Analysis');
    report.push(`- **Information Architecture**: ${uxBestPractices.informationArchitecture.score}/100`);
    report.push(`- **Usability**: ${uxBestPractices.usability.score}/100`);
    report.push(`- **Accessibility**: ${uxBestPractices.accessibility.score}/100`);
    report.push(`- **Mobile Experience**: ${uxBestPractices.mobileExperience.score}/100`);
    report.push('');

    // Layout Patterns
    report.push('## 📐 Layout Pattern Analysis');
    report.push(`- **Detected Patterns**: ${layoutPatterns.detectedPatterns.join(', ')}`);
    report.push(`- **Layout Type**: ${layoutPatterns.layoutType}`);
    report.push(`- **Complexity**: ${layoutPatterns.complexity}`);
    report.push('');

    if (layoutPatterns.recommendations.length > 0) {
      report.push('### Layout Recommendations:');
      layoutPatterns.recommendations.forEach(rec => {
        report.push(`- ${rec}`);
      });
      report.push('');
    }

    // Competitor Analysis
    report.push('## 🏆 Competitor Comparison');
    report.push(`- **Visual Appeal**: ${competitorAnalysis.visualAppeal.score}/100`);
    report.push(`- **User Experience**: ${competitorAnalysis.userExperience.score}/100`);
    report.push(`- **Differentiation**: ${competitorAnalysis.differentiation.score}/100`);
    report.push('');

    if (competitorAnalysis.differentiation.competitiveAdvantages.length > 0) {
      report.push('### Competitive Advantages:');
      competitorAnalysis.differentiation.competitiveAdvantages.forEach(adv => {
        report.push(`- ${adv}`);
      });
      report.push('');
    }

    if (competitorAnalysis.differentiation.improvementOpportunities.length > 0) {
      report.push('### Improvement Opportunities:');
      competitorAnalysis.differentiation.improvementOpportunities.forEach(opp => {
        report.push(`- ${opp}`);
      });
      report.push('');
    }

    // Recommendations
    report.push('## 💡 Aesthetic Recommendations');
    
    if (styleGuide.compliance.score < 80) {
      report.push('### Style Guide Improvements');
      report.push('- Ensure consistent use of brand colors (garden green, jovial jade)');
      report.push('- Implement proper typography hierarchy with Crimson Text');
      report.push('- Follow 8px spacing grid system');
      report.push('- Use consistent component styles');
      report.push('');
    }

    if (uiBestPractices.visualHierarchy.score < 80) {
      report.push('### UI Improvements');
      report.push('- Improve visual hierarchy with proper heading structure');
      report.push('- Add more white space for better readability');
      report.push('- Ensure consistent color usage');
      report.push('- Implement proper typography scale');
      report.push('');
    }

    if (uxBestPractices.informationArchitecture.score < 80) {
      report.push('### UX Improvements');
      report.push('- Enhance navigation clarity');
      report.push('- Improve content organization');
      report.push('- Add clear call-to-actions');
      report.push('- Ensure mobile responsiveness');
      report.push('');
    }

    return report.join('\n');
  }
}
