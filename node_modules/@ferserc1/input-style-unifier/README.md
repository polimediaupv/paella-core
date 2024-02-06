# input-style-unifier

A CSS only library to unify the styles of input fields across all browsers

## Usage

Include the `.isu` class in the input field whose design you want to homogenize, and then modify the CSS variables you want change. It's recommended to modify the common variables first.

## Common variables

- **--isu-main-fg-color**: Main color for use in foreground elements, such as text.
- **--isu-main-bg-color**: Main color for use on neutral colored backgrounds.
- **--isu-theme-color-1**:  Color 1 of the color scheme, default is a light color.
- **--isu-theme-color-2**: Color 2 of the color scheme, default is a light color.
- **--isu-theme-color-3**: Color 3 of the color scheme, default is a dark color.
- **--isu-theme-color-4**: Color 4 of the color scheme, default is a dark color.
- **--isu-highlight-color**: Color used to highlight elements, for example, a focused input.
- **--isu-transition-time-slow**: Time for slow transitions.
- **--isu-transition-time-medium**: Time for medium speed transitions.
- **--isu-transition-time-fast**: Time for fast transitions

## input[range]

The parts of a range input control are the following:

![Input type range](doc/images/range.svg)

Notes:

- The lower track is the part of the runnable track that goes from the beginning to the knob. The upper track goes from the knob to the end of the range field. The It is not possible to set different styles for lower and upper tracks of the range input using CSS-only solution because Webkit-based browsers doesn't have this property.
- The outline style of the runnable track is drawn over the knob in webkit-based browsers, so it's not a good idea to use it if the knob is taller than the runnable track. For this reason, there aren't CSS variables to control the runnable track style in hover and active states.
- The tick marks and vertical sliders are not supported yet.

### CSS Variables:

**Input field:**

- **--range-input-default-width**: the default width of the input[range] control

**Runnable track:**

- **--range-runnable-track-background**
- **--range-runnable-track-height**
- **--range-runnable-track-border-radius**
- **--range-runnable-track-border-size**
- **--range-runnable-track-border-color**
- **--range-runnable-track-border-style**
- **--range-runnable-track-outline**
- **--range-runnable-track-outline-offset**
- **--range-runnable-track-box-shadow**

**Runnable track, focus state:**

- **--range-runnable-track-focus-background**
- **--range-runnable-track-focus-height**
- **--range-runnable-track-focus-border-radius**
- **--range-runnable-track-focus-border-size**
- **--range-runnable-track-focus-border-color**
- **--range-runnable-track-focus-border-style**
- **--range-runnable-track-focus-outline**
- **--range-runnable-track-focus-outline-offset**

**Knob button:**

- **--range-thumb-background**
- **--range-thumb-size**
- **--range-thumb-border-radius**
- **--range-thumb-border**
- **--range-thumb-outline**
- **--range-thumb-outline-offset**
- **--range-thumb-box-shadow**

**Knob button, hover state:**

- **--range-thumb-hover-background**
- **--range-thumb-hover-size**
- **--range-thumb-hover-border-radius**
- **--range-thumb-hover-border**
- **--range-thumb-hover-outline**
- **--range-thumb-hover-outline-offset**

**Knob button, focus sate:**

- **--range-thumb-focus-background**
- **--range-thumb-focus-size**
- **--range-thumb-focus-border-radius**
- **--range-thumb-focus-border**
- **--range-thumb-focus-outline**
- **--range-thumb-focus-outline-offset**

**Knob button, active state:**

**--range-thumb-active-background**
**--range-thumb-active-size**
**--range-thumb-active-border-radius**
**--range-thumb-active-border**
**--range-thumb-active-outline**
**--range-thumb-active-outline-offset**

