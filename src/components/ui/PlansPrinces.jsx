import '../../css/plans.css'

const PlansPrinces = () => {
    return (
        <section className='docs-content'>

            <section className='plans-feed'>

                <div className="ctn-plans">
                    <article className='plan'>
                        <h1>BASIC</h1>
                        <h3>Create with cutting-edge technology. Zero cost, maximum impact.</h3>
                        <section className='price'>
                            <h1><span>$Free</span> /month</h1>
                            <h2>No image processing support.</h2>
                        </section>
                        <h3>Cash <span>$00,00</span></h3>
                        <button onClick={() => window.location.href = 'https://graham-ai-kappa.vercel.app/'}>Access</button>
                        <h2>Access the BASIC plan and get:</h2>
                        <div className='ul'>
                            <li><i className='fa-solid fa-check'></i> Smart and fluid chat.</li>
                            <li><i className='fa-solid fa-check'></i> 50 conversations per day</li>
                            <li><i className='fa-solid fa-check'></i> Improved contextual understanding.</li>
                            <li><i className='fa-solid fa-check'></i> Uploading files (beta).</li>
                            <li><i className='fa-solid fa-check'></i> Fast and immersive interface.</li>
                        </div>
                    </article>

                    <article className='plan'>
                        <h1>PRO</h1>
                        <h3>The future doesn't wait. Experience Graham AI at full power.</h3>
                        <section className='price'>
                            <h1><span>$20</span>/month</h1>
                            <h2>Extra costs may apply for massive use.</h2>
                        </section>
                        <h3>Cash <span>$240,00</span></h3>
                        <button className='active'>Unlock</button>
                        <h2>All the benefits of BASIC plus more exclusive advantages:</h2>
                        <div className='ul'>
                            <li><i className='fa-solid fa-check'></i> Ultra-fast and accurate responses.</li>
                            <li><i className='fa-solid fa-check'></i> unlimited conversations</li>
                            <li><i className='fa-solid fa-check'></i> Priority access to new models.</li>
                            <li><i className='fa-solid fa-check'></i> Advanced text and image generation.</li>
                            <li><i className='fa-solid fa-check'></i> Expanded context for long projects.</li>
                            <li><i className='fa-solid fa-check'></i> Complete customization of style and tone.</li>
                            <li><i className='fa-solid fa-check'></i> Exclusive support and priority feedback.</li>
                        </div>
                    </article>
                </div>

                <section className='sec-payment-methods'>
                    <div className="pay-met">
                        <i className='fa-solid fa-credit-card'></i>
                        <i className='fa-brands fa-paypal'></i>
                        <i className='fa-brands fa-pix'></i>
                        <i className='fas fa-coins'></i>
                    </div>
                    <h2>Pay by credit card in up to 12x, PayPal or Pix</h2>
                    <h3>We guarantee free cancellation within 7 days</h3>
                </section>
            </section>

        </section>
    )
}

export default PlansPrinces
