const TickerBar = () => {
  const tickerText =
    "25+ Years Experience \u00A0•\u00A0 4,000+ Products \u00A0•\u00A0 250+ Brands \u00A0•\u00A0 National Distribution \u00A0•\u00A0 FMCG Wholesale Australia \u00A0•\u00A0 ";

  return (
    <div className="bg-secondary text-secondary-foreground py-2 overflow-hidden border-b border-secondary-foreground/10 text-[10px] tracking-[0.2em] font-medium uppercase">
      <div className="inline-block animate-marquee whitespace-nowrap">
        <span>{tickerText}</span>
        <span>{tickerText}</span>
      </div>
    </div>
  );
};

export default TickerBar;
