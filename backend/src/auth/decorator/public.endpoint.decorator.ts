import { SetMetadata } from '@nestjs/common'

// TODO: maybe rename to AvailableWithoutAccessToken
export const PublicEndpointMarker = 'isPublicEndpoint'
export const PublicEndpoint = () => SetMetadata(PublicEndpointMarker, true)
