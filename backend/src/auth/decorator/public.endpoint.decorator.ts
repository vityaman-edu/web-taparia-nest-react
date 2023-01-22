import { SetMetadata } from '@nestjs/common'

export const PublicEndpointMarker = 'isPublicEndpoint'
export const PublicEndpoint = () => SetMetadata(PublicEndpointMarker, true)
