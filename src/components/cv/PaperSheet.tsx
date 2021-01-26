/**
 * Printer Friendly Paper Sheet rendered with CSS directives as Styled Reacts divs
 */

import styled from '@emotion/styled'

interface PaperSheetProps {
  internalMargins: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

interface SectionProps {
  heightInMm: number
}

const PaperSheet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
  margin: 0;
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  font-family: 'Source Sans Pro', sans-serif;

  @page {
    margin: 0;
  }

  @media print {
    html,
    body,
    main {
      visibility: hidden;
    }

    & {
      -webkit-print-color-adjust: exact;
      background-color: white;
      height: 100%;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      margin: 0 !important;
      float: none !important;
      visibility: visible;
      border: none !important;
      border-radius: initial;
      min-height: initial;
      box-shadow: initial;
      page-break-after: always;
      page-break-inside: avoid;
    }
  }
`

export const A4PaperSheet = styled(PaperSheet)`
  width: 210mm;
  min-width: 210mm;
  height: 297mm;
  min-height: 297mm;
  padding-top: ${(props: PaperSheetProps) => props.internalMargins.top}mm;
  padding-bottom: ${(props: PaperSheetProps) => props.internalMargins.bottom}mm;
  padding-left: ${(props: PaperSheetProps) => props.internalMargins.left}mm;
  padding-right: ${(props: PaperSheetProps) => props.internalMargins.right}mm;
`

export const Section = styled.div`
  display: flex;
  align-content: stretch;
  flex-direction: row;
  justify-content: space-between;
  flex: 0 1 0;
  height: ${(props: SectionProps) => props.heightInMm}mm;
  min-height: ${(props: SectionProps) => props.heightInMm}mm;
`

export const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 0 1 0;
  padding-left: 15px;
  padding-right: 15px;
  align-self: auto;
  flex-grow: 1;
`
