module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: [],
    theme: {
        extend: {
            colors: {
                beige: {
                    50: '#FDFDFA',
                    100: '#FAFAF8',
                    200: '#E8E8E5',
                    300: '#DBDAD6',
                    400: '#BFBFB8',
                    500: '#A4A39A',
                    600: '#94938B',
                    700: '#62625C',
                    800: '#4A4945',
                    900: '#31312E'
                }
            }
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover']
    },
    plugins: [],
}
  