import React from 'react'
import ContentLoader from 'react-content-loader'

export const PreSlider = () => (
    <div>
    	<ContentLoader
		    height={600}
		    width={1300}
		    speed={3}
		    primaryColor="#f3f3f3"
		    secondaryColor="#ecebeb"
		 >
		    <rect x="0" y="0" rx="0" ry="0" width="1300" height="600" />
		</ContentLoader>
    </div>
);
export const PreProduct = () => (
    <div>
		<ContentLoader 
			height={400}
			width={1300}
			speed={3}
			primaryColor="#f3f3f3"
			secondaryColor="#ecebeb"
		>
			<rect x="20" y="3" rx="10" ry="10" width="300" height="180" /> 
			<rect x="20" y="190" rx="0" ry="0" width="292" height="20" /> 
			<rect x="20" y="215" rx="0" ry="0" width="153" height="20" /> 

			<rect x="340" y="3" rx="10" ry="10" width="300" height="180" /> 
			<rect x="340" y="190" rx="0" ry="0" width="292" height="20" /> 
			<rect x="340" y="215" rx="0" ry="0" width="153" height="20" />

			<rect x="660" y="3" rx="10" ry="10" width="300" height="180" /> 
			<rect x="660" y="190" rx="0" ry="0" width="292" height="20" /> 
			<rect x="660" y="215" rx="0" ry="0" width="153" height="20" />

			<rect x="980" y="3" rx="10" ry="10" width="300" height="180" /> 
			<rect x="980" y="190" rx="0" ry="0" width="292" height="20" /> 
			<rect x="980" y="215" rx="0" ry="0" width="153" height="20" />
		</ContentLoader>
    </div>
)
export const PreMision = () => (
	<div>
		<ContentLoader 
			height={40}
			width={335}
			speed={3}
			primaryColor="#f3f3f3"
			secondaryColor="#ecebeb"
		>
			<rect x="0" y="0" rx="0" ry="0" width="330" height="40" />
		</ContentLoader>
	</div>
)